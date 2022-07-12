import * as esbuild from 'esbuild';
import { URL } from 'url';

type PluginFactoryType = () => esbuild.Plugin;

export const resolverPlugin: PluginFactoryType = () => {
	return {
		name: 'resolver-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onResolve({ filter: /^index\.js$/ }, () => {
				return {
					path: 'index.js',
					namespace: 'a',
				};
			});

			build.onResolve({ filter: /.*/ }, (args: esbuild.OnResolveArgs) => {
				if (args.path.startsWith('./') || args.path.startsWith('../')) {
					if (
						args.importer.startsWith('https://') ||
						args.importer.startsWith('http://')
					) {
						console.log('https:::::////', args.path);
						return {
							namespace: 'unpkg',
							path: new URL(args.path, args.importer + '/').toString(),
						};
					}
				}
				if (args.path.endsWith('.css')) {
					return {
						namespace: 'unpkg-css',
						path: `https://unpkg.com/${args.path}`,
					};
				}
				console.log('got hererererer!!!!', args.path);
				return {
					namespace: 'unpkg',
					path: `https://unpkg.com/${args.path}`,
				};
			});
		},
	};
};
