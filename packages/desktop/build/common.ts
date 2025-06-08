import type { SwcLoaderJscConfig, Configuration } from '@rspack/core'

export const config = {
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				type: 'javascript/auto',
				use: {
					loader: 'builtin:swc-loader',
					options: {
						sourceMap: false,
						isModule: true,
						jsc: {
							parser: {
								syntax: 'typescript',
								tsx: true,
								dynamicImport: true,
								exportDefaultFrom: true,
								exportNamespaceFrom: true,
								decorators: false
							},
							transform: {
								legacyDecorator: false,
								decoratorMetadata: false,
								react: {
									development: false,
									refresh: false,
									runtime: 'automatic',
									useBuiltins: true
								}
							},
							minify: {
								compress: {
									// drop_console: false
								}
							},
							externalHelpers: true
						} as SwcLoaderJscConfig,
						env: {
							targets: 'chrome >= 120'
						}
					}
				}
			}
		]
	}
} as Configuration
