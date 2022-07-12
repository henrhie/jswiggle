import * as esbuild from 'esbuild-wasm';
import { resolverPlugin } from './plugins/resolver-plugin';
import { loaderPlugin } from './plugins/loader-plugin';

export type IStore = { [key: string]: string };

let service: esbuild.Service;

export const bundleCode = async (
	store: IStore
) => {
	
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }
	const buildResult = await service.build({
		entryPoints: ['index.js'],
		bundle: true,
		platform: 'browser',
		write: false,
		plugins: [resolverPlugin(), loaderPlugin(store)],
		define: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'process.env.NODE_ENV': '"production"',
			global: 'window',
		},
		incremental: false,
	});

	return buildResult;
};