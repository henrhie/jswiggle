/* eslint-disable @typescript-eslint/naming-convention */
import * as esbuild from 'esbuild-wasm';
import { PluginFactoryType } from './unpkg-plugin';
import { service } from '..';

export const typeScriptPlugin: PluginFactoryType = (store) => {
	return {
		name: 'typescript-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore
			build.onLoad({ filter: /.*/ }, async () => {
				if (store.activeScript === 'typescript') {
					const transformOutput = await service.transform(store._js, {
						loader: 'ts',
					});
					return {
						loader: 'jsx',
						contents: transformOutput.code,
					};
				}
			});
		},
	};
};
