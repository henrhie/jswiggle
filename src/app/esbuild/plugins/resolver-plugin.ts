import * as esbuild from 'esbuild';
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
						return {
							namespace: 'unpkg',
							path: new URL(
								args.path,
								'https://unpkg.com' + args.resolveDir + '/'
							).href,
						};
					}
				}
				if (args.path.endsWith('.css')) {
					return {
						namespace: 'unpkg-css',
						path: `https://unpkg.com/${args.path}`,
					};
				}
				return {
					namespace: 'unpkg',
					path: `https://unpkg.com/${args.path}`,
				};
			});
		},
	};
};
