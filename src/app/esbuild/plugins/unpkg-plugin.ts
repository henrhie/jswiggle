import * as esbuild from 'esbuild';
import * as localForage from 'localforage';
import axios from 'axios';

const fileCache = localForage.createInstance({
	name: 'cache',
});

export type MapModuleNametoModule = { [key: string]: string };
export type PluginFactoryType = (
	cells: MapModuleNametoModule
) => esbuild.Plugin;

export const unpkgPlugin = () => {
	return {
		name: 'unpkg-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore
			build.onLoad({ filter: /.*/, namespace: 'unpkg' }, async (args) => {
				const cacheData = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);

				if (cacheData) {
					return cacheData;
				}
			});

			build.onLoad(
				{ filter: /^https?:\/\//, namespace: 'unpkg' },
				async (args) => {
					const { data, request } = await axios.get<string>(args.path);

					const chunk: esbuild.OnLoadResult = {
						loader: 'jsx',
						contents: data,
						resolveDir: new URL('./', request.responseURL).pathname,
					};
					await fileCache.setItem(args.path, chunk);
					return chunk;
				}
			);

			build.onLoad(
				{ filter: /.css$/, namespace: 'unpkg-css' },
				async (args: esbuild.OnLoadArgs) => {
					const { data, request } = await axios.get<string>(
						args.path.replace(/.css$/, '')
					);

					const escaped = data
						.replace(/\n/g, '')
						.replace(/"/g, '\\"')
						.replace(/'/g, "\\'");

					const contents = `
			    const style = document.createElement("style");
			    style.innerText = "${escaped}";
			    document.head.appendChild(style);
			  `;

					const result: esbuild.OnLoadResult = {
						loader: 'jsx',
						contents,
						resolveDir: new URL('./', request.responseURL).pathname,
					};

					await fileCache.setItem(args.path, result);
					return result;
				}
			);
		},
	};
};
