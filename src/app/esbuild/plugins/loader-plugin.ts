import * as esbuild from 'esbuild';
import * as localForage from 'localforage';
import axios from 'axios';

const fileCache = localForage.createInstance({
	name: 'cache',
});

type MapModuleNametoModule = { [key: string]: string };
type PluginFactoryType = (cells: MapModuleNametoModule) => esbuild.Plugin;

export const loaderPlugin: PluginFactoryType = (store) => {
	return {
		name: 'loader-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onLoad({ filter: /^index\.js$/ }, () => {
				const css_ = store._css;
				console.log('css]]]]]]]]]]]>>>: ', css_);
				const escaped = css_
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");

				const contents = `
			    const style = document.createElement("style");
			    style.innerText = "${escaped}";
			    document.head.appendChild(style);
			  `;
				const jsWithCss = store._js + contents;
				return {
					loader: 'jsx',
					contents: jsWithCss,
				};
			});

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
						// args.path.replace(/.css$/, '')
						args.path
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

			// build.onEnd((result: esbuild.BuildResult) => {
			// 	const css_ = store._css;
			// 	const escaped = css_
			// 		.replace(/\n/g, '')
			// 		.replace(/"/g, '\\"')
			// 		.replace(/'/g, "\\'");

			// 	const contents = `
			//     const style = document.createElement("style");
			//     style.innerText = "${escaped}";
			//     document.head.appendChild(style);
			//   `;
			// 	result.outputFiles[0].text += contents;
			// });
		},
	};
};
