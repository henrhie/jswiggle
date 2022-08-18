import * as esbuild from 'esbuild';
import { IState } from '../redux';
import { experimentalPlugin } from './plugins/experimental-plugin';
import { resolverPlugin } from './plugins/resolver-plugin';
import { unpkgPlugin } from './plugins/unpkg-plugin';

// export let service: esbuild.Service;

export const bundleCode = async (store: IState) => {
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
		//
	}

	const buildResult = await esbuild.build({
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
		jsx: 'transform',
	});

	return buildResult;
};
