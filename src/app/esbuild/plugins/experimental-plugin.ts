import * as esbuild from 'esbuild';
import coffeescript from 'coffeescript/lib/coffeescript-browser-compiler-modern/coffeescript';
import * as less from 'less';
import Sass from 'sass.js/dist/sass.sync.js';

import { PluginFactoryType } from './unpkg-plugin';
import { service } from '..';

export const experimentalPlugin: PluginFactoryType = ({ code, mode }) => {
	return {
		name: 'experimental-plugin',
		setup(build: esbuild.PluginBuild) {
			//@ts-ignore

			build.onLoad({ filter: /.*/, namespace: 'a' }, async () => {
				let scriptContent: string;
				let stylesheetContent: string;
				const { activeScript, activeStyleSheet } = mode;
				const { script, stylesheet } = code;
				if (activeScript === 'javascript') {
					scriptContent = script;
				}
				if (activeScript === 'typescript') {
					const transformOutput = await service.transform(script, {
						loader: 'ts',
					});
					scriptContent = transformOutput.code;
				}
				if (activeScript === 'coffee') {
					scriptContent = coffeescript.compile(script);
				}
				if (activeStyleSheet === 'css') {
					const escaped = stylesheet
						.replace(/\n/g, '')
						.replace(/"/g, '\\"')
						.replace(/'/g, "\\'")
						.replace(/\r/g, '');

					stylesheetContent = `
			    const style = document.createElement("style");
			    style.innerText = "${escaped}";
			    document.head.appendChild(style);`;
				}
				if (activeStyleSheet === 'less') {
					const transformOutput = await less.render(stylesheet);
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
				if (activeStyleSheet === 'sass' || activeStyleSheet === 'scss') {
					const isSass = activeStyleSheet === 'sass';
					const sassCompile = (): Promise<string> => {
						return new Promise((resolve, reject) => {
							console.log('sheet: ', stylesheet);
							Sass.compile(
								stylesheet,
								{ indentedSyntax: isSass },
								(result: any) => {
									let transformOutput = result.text;
									const escaped = (transformOutput || '')
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
								}
							);
						});
					};
					stylesheetContent = await sassCompile();
				}

				return {
					contents: scriptContent + stylesheetContent,
					loader: 'jsx',
				};
			});
		},
	};
};
