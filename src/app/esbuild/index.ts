import * as esbuild from 'esbuild-wasm';
import { IState } from '../redux';
import { experimentalPlugin } from './plugins/experimental-plugin';
import { resolverPlugin } from './plugins/resolver-plugin';
import { unpkgPlugin } from './plugins/unpkg-plugin';

export let service: esbuild.Service;

export const bundleCode = async (store: IState) => {
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
		plugins: [resolverPlugin(), experimentalPlugin(store), unpkgPlugin()],
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
