/* eslint-disable @typescript-eslint/naming-convention */
import * as esbuild from 'esbuild';
import { PluginFactoryType } from './unpkg-plugin';

export const javascriptPlugin: PluginFactoryType = (store) => {
	return {
		name: 'javascript-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore
			build.onLoad({ filter: /.*/ }, () => {
				if (store.activeScript === 'javascript') {
					return {
						contents: store._js,
					};
				}
			});
		},
	};
};
