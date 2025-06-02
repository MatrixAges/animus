import { defineConfig } from '@rspack/cli'
import { CopyRspackPlugin, DefinePlugin, HtmlRspackPlugin, LightningCssMinimizerRspackPlugin } from '@rspack/core'
import ReactRefreshPlugin from '@rspack/plugin-react-refresh'
import { resolve } from 'path'

const is_dev = process.env.NODE_ENV === 'development'
const is_prod = process.env.NODE_ENV === 'production'
const is_release = process.env.RELEASE === '1'
const is_module = false
const targets = 'chrome >= 120'

const defines = {} as Record<string, string | number | boolean>

defines['process.env.RELEASE'] = is_release ? 1 : 0
defines['process.env.SHELL'] = JSON.stringify(process.env.SHELL)

const plugins_dev = [
	new ReactRefreshPlugin({
		exclude: [/node_modules/]
	})
]

const plugins_prod = [
	new CopyRspackPlugin({
		patterns: [{ from: './public', to: './', globOptions: { ignore: ['**/index.html'] } }]
	})
]

const config = is_prod ? defineConfig({ devtool: false }) : {}

module.exports = defineConfig({
	...config,
	entry: {
		main: './runtime/index.tsx'
	},
	output: {
		clean: is_prod
	},
	watchOptions: {
		ignored: /node_modules/
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		tsConfig: resolve(__dirname, 'tsconfig.json')
	},
	experiments: {
		css: true,
		outputModule: is_module,
		lazyCompilation: false,
		incremental: is_dev,
		parallelLoader: true
	},
	optimization: {
		minimizer: [
			new LightningCssMinimizerRspackPlugin({
				minimizerOptions: {
					targets
				}
			})
		]
	},
	plugins: [
		new DefinePlugin(defines),
		new HtmlRspackPlugin({
			title: 'IF - GTD for professionals.',
			template: './public/index.html',
			scriptLoading: is_module ? 'module' : 'defer',
			templateParameters: {
				NODE_ENV: process.env.NODE_ENV!
			}
		}),
		...(is_dev ? plugins_dev : plugins_prod)
	],
	ignoreWarnings: [/Conflicting order/, /differ in casing/],
	module: {
		parser: {
			css: { namedExports: false },
			'css/auto': { namedExports: false },
			'css/module': { namedExports: false }
		},
		rules: [
			{
				test: /\.ts$/,
				use: {
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							parser: {
								syntax: 'typescript',
								dynamicImport: true,
								exportDefaultFrom: true,
								exportNamespaceFrom: true,
								decorators: true
							},
							transform: {
								legacyDecorator: true,
								decoratorMetadata: true
							},
							minify: {
								compress: {
									drop_console: !is_sandbox && is_prod
								}
							},
							externalHelpers: true
						},
						env: {
							targets: 'chrome >= 120'
						}
					}
				}
			},
			{
				test: /\.tsx$/,
				exclude: [/[\\/]node_modules[\\/]/],
				use: {
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							parser: {
								syntax: 'typescript',
								tsx: true,
								dynamicImport: true,
								exportDefaultFrom: true,
								exportNamespaceFrom: true,
								decorators: true
							},
							transform: {
								legacyDecorator: true,
								decoratorMetadata: true,
								react: {
									development: is_dev,
									refresh: is_dev,
									runtime: 'automatic',
									useBuiltins: true
								}
							},
							minify: {
								compress: {
									drop_console: !is_sandbox && is_prod
								}
							},
							externalHelpers: true,
							experimental: {
								plugins: [['swc-plugin-jsx-control-statements', {}]]
							}
						},
						env: {
							targets
						}
					}
				}
			},
			{
				test: /\.global\.css$/,
				type: 'css',
				use: [
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-import', 'postcss-nested', 'postcss-calc']
							}
						}
					}
				]
			},
			{
				test: /\.css$/,
				type: 'css/module',
				exclude: /\.global\.css$/,
				use: [
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-import', 'postcss-nested', 'postcss-calc']
							}
						}
					}
				]
			},
			{
				test: /\.(png|jpg|svg|mp3)$/,
				type: 'asset/resource'
			},
			{
				resourceQuery: /raw/,
				type: 'asset/source'
			}
		]
	}
})
