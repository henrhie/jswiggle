import * as esbuild from 'esbuild';
import { PluginFactoryType } from './unpkg-plugin';
import * as sass from 'sass';

export const sassPlugin: PluginFactoryType = (store) => {
	return {
		name: 'sass-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore
			build.onLoad({ filter: /.*/ }, () => {
				if (store.activeStyleSheet === 'sass') {
					const transformOutput = sass.compileString(store._css);
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
