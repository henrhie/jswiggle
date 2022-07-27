import * as esbuild from 'esbuild';
import { PluginFactoryType } from './unpkg-plugin';
import coffeescript from 'coffeescript/lib/coffeescript-browser-compiler-modern/coffeescript';

export const coffeescriptPlugin: PluginFactoryType = (store) => {
	return {
		name: 'coffeescript-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore
			build.onLoad({ filter: /.*/ }, () => {
				if (store.activeScript === 'coffee') {
					const js = coffeescript.compile(store._js);
					return {
						loader: 'jsx',
						contents: js,
					};
				}
			});
		},
	};
};
