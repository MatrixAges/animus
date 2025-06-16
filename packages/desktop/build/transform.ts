import { rspack } from '@rspack/core'

import type { Configuration } from '@rspack/core'

const common = {
	module: {
		rules: [
			{
				test: /\.ts$/,
				type: 'javascript/auto',
				exclude: [/node_modules/],
				loader: 'builtin:swc-loader',
				options: { jsc: { parser: { syntax: 'typescript' } } }
			}
		]
	}
} as Configuration

rspack(
	[
		{
			entry: `${process.cwd()}/scripts/preload.ts`,
			target: 'electron-preload',
			output: {
				clean: false,
				library: { type: 'commonjs' },
				filename: 'preload.js'
			},
			...common
		},
		{
			entry: `${process.cwd()}/scripts/notarize.ts`,
			externals: ['@electron/notarize', 'electron-builder'],
			output: {
				clean: false,
				library: { type: 'commonjs' },
				filename: 'notarize.js'
			},
			...common
		}
	],
	async (e, stats) => {
		const err = e || stats?.hasErrors?.()

		if (err) {
			console.log(err, stats?.toString({}))

			return
		}
	}
)
