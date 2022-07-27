/* eslint-disable @typescript-eslint/naming-convention */
import * as esbuild from 'esbuild';
import { PluginFactoryType } from './unpkg-plugin';

export const cssPlugin: PluginFactoryType = (store) => {
	return {
		name: 'css-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore
			build.onLoad({ filter: /.*/ }, () => {
				console.log('cssss calllled');
				if (store.activeStyleSheet === 'css') {
					const escaped = store._css
						.replace(/\n/g, '')
						.replace(/"/g, '\\"')
						.replace(/'/g, "\\'")
						.replace(/\r/g, '');

					const contents = `
			    const style = document.createElement("style");
			    style.innerText = "${escaped}";
			    document.head.appendChild(style);
			  `;
					return {
						contents,
					};
				}
			});
		},
	};
};
