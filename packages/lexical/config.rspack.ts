import { resolve } from 'path'

import { getExternals } from './build.utils'

import type { Configuration, SwcLoaderJscConfig } from '@rspack/core'

const externals = getExternals()

export default {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		tsConfig: resolve(__dirname, 'tsconfig.json')
	},
	devtool: false,
	externalsType: 'module',
	externals: [
		'react',
		'react-dom',
		(item: { request: string }, callback: (...args: any) => void) => {
			const request = item.request

			if (!externals.includes(request)) {
				return callback()
			}

			try {
				require.resolve(request)
			} catch (err) {
				callback(null, request)
			}

			callback()
		}
	],
	experiments: {
		outputModule: true
	},
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
