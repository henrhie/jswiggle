import * as esbuild from 'esbuild';
import coffeescript from 'coffeescript/lib/coffeescript-browser-compiler-modern/coffeescript';
import * as less from 'less';
// import * as sass from 'sass';
import Sass from 'sass.js/dist/sass.sync.js';

import { PluginFactoryType } from './unpkg-plugin';
import { service } from '..';

export const experimentalPlugin: PluginFactoryType = (store) => {
	return {
		name: 'experimental-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore

			build.onLoad({ filter: /.*/, namespace: 'a' }, async () => {
				let scriptContent: string;
				let stylesheetContent: string;
				const setSheet = function (s: string) {
					stylesheetContent = s;
				};
				if (store.activeScript === 'javascript') {
					scriptContent = store._js;
				}
				if (store.activeScript === 'typescript') {
					const transformOutput = await service.transform(store._js, {
						loader: 'ts',
					});
					scriptContent = transformOutput.code;
				}
				if (store.activeScript === 'coffeescript') {
					scriptContent = coffeescript.compile(store._js);
				}
				if (store.activeStyleSheet === 'css') {
					const escaped = store._css
						.replace(/\n/g, '')
						.replace(/"/g, '\\"')
						.replace(/'/g, "\\'")
						.replace(/\r/g, '');

					stylesheetContent = `
			    const style = document.createElement("style");
			    style.innerText = "${escaped}";
			    document.head.appendChild(style);`;
				}
				if (store.activeStyleSheet === 'less') {
					const transformOutput = await less.render(store._css);
					const escaped = transformOutput.css
						.replace(/\n/g, '')
						.replace(/"/g, '\\"')
						.replace(/'/g, "\\'")
						.replace(/\r/g, '');

					stylesheetContent = `
			    const style = document.createElement("style");
			    style.innerText = "${escaped}";
			    document.head.appendChild(style);
			  `;
				}
				if (store.activeStyleSheet === 'sass') {
					console.log('got into sasssssssssss');
					const sassCompile = (): Promise<string> => {
						return new Promise((resolve, reject) => {
							Sass.compile(store._css, (result: any) => {
								let transformOutput = result.text;
								const escaped = transformOutput
									.replace(/\n/g, '')
									.replace(/"/g, '\\"')
									.replace(/'/g, "\\'")
									.replace(/\r/g, '');

								let stylesheetContent_ = `
                  const style = document.createElement("style");
                  style.innerText = "${escaped}";
                  document.head.appendChild(style);
                `;
								resolve(stylesheetContent_);
							});
						});
					};
					stylesheetContent = await sassCompile();
					console.log('syytelshots content;s ;, ', stylesheetContent);
				}

				return {
					contents: scriptContent + stylesheetContent,
				};
			});
		},
	};
};
