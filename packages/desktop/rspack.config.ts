import { resolve } from 'path'

import { defineConfig } from '@rspack/cli'
import { DefinePlugin } from '@rspack/core'

import type { SwcLoaderJscConfig } from '@rspack/core'

const is_prod = process.env.MODE === 'prod'

module.exports = defineConfig({
	entry: './src/index.ts',
	output: {
		clean: is_prod,
		filename: 'index.js',
		library: {
			type: 'commonjs'
		}
	},
	target: 'electron-main',
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			'@desktop': resolve(`${process.cwd()}/src`)
		}
	},
	devtool: false,
	externals: ['electron'],
	watchOptions: {
		ignored: /node_modules/
	},
	experiments: {},
	optimization: {
		minimize: is_prod
	},
	plugins: [
		new DefinePlugin({
			'process.env.PROD': JSON.stringify(is_prod ? 1 : 0),
			'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM)
		})
	],
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
									drop_console: is_prod
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
})
