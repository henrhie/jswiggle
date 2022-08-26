import * as esbuild from 'esbuild-wasm';
import * as _esbuild from 'esbuild';
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

	let jsxFactory: string;
	let jsxFragment: string;
	switch (store.mode.jsxFactory) {
		case 'React':
			jsxFactory = 'React.createElement';
			jsxFragment = 'React.Fragment';
			break;
		case 'Preact':
			jsxFactory = 'h';
			jsxFragment = 'Fragment';
			break;
		default:
			jsxFactory = void 0;
			jsxFragment = void 0;
	}
	let buildResult: esbuild.BuildResult & { outputFiles: esbuild.OutputFile[] };
	try {
		buildResult = await service.build({
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
			jsxFactory,
			jsxFragment,
		});
	} catch (error) {
		console.log('error inner: ', error);
		throw error;
	}

	return buildResult;
};
