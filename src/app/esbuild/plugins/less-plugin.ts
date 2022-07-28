/* eslint-disable @typescript-eslint/naming-convention */
import * as esbuild from 'esbuild';
import { PluginFactoryType } from './unpkg-plugin';
import * as less from 'less';

export const LessPlugin: PluginFactoryType = (store) => {
	return {
		name: 'less-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore
			build.onLoad({ filter: /.*/ }, async () => {
				if (store.activeStyleSheet === 'less') {
					const transformOutput = await less.render(store._css);
					const escaped = transformOutput.css
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
