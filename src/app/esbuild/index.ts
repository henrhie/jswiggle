import * as esbuild from 'esbuild-wasm';
import { coffeescriptPlugin } from './plugins/coffeescript-plugin';
import { cssPlugin } from './plugins/css-plugin';
import { experimentalPlugin } from './plugins/experimental-plugin';
import { javascriptPlugin } from './plugins/javascript-plugin';
import { LessPlugin } from './plugins/less-plugin';
import { resolverPlugin } from './plugins/resolver-plugin';
import { sassPlugin } from './plugins/sass-plugin';
import { typeScriptPlugin } from './plugins/typescript-plugin';
import { unpkgPlugin } from './plugins/unpkg-plugin';

export type IStore = { [key: string]: any };

export let service: esbuild.Service;

export const bundleCode = async (store: IStore) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	}
	const buildResult = await service.build({
		entryPoints: ['index.js'],
		bundle: true,
		platform: 'browser',
		write: false,
		plugins: [
			resolverPlugin(),
			experimentalPlugin(store),
			// javascriptPlugin(store),
			// typeScriptPlugin(store),
			// coffeescriptPlugin(store),
			// cssPlugin(store),
			// sassPlugin(store),
			// LessPlugin(store),
			unpkgPlugin(),
		],
		define: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'process.env.NODE_ENV': '"production"',
			global: 'window',
		},
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
	});

	return buildResult;
};
