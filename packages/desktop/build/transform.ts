import { rspack, DefinePlugin } from '@rspack/core'

import { config } from './common'

import type { Configuration } from '@rspack/core'

const common_config = {
	resolve: { extensions: ['.js', '.ts'] },
	target: 'electron-preload',
	externals: ['electron'],
	plugins: [
		new DefinePlugin({
			'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM)
		})
	],
	...config
} as Configuration

rspack(
	[
		{
			entry: `${process.cwd()}/scripts/preload.ts`,
			output: {
				path: `${process.cwd()}/load`,
				clean: false,
				library: { type: 'commonjs' },
				filename: 'preload.js'
			},
			...common_config
		},
		{
			entry: {
				afterpack: `${process.cwd()}/scripts/afterpack.ts`,
				notarize: `${process.cwd()}/scripts/notarize.ts`
			},
			output: {
				path: `${process.cwd()}/scripts/output`,
				clean: false,
				library: { type: 'commonjs' },
				filename: '[name].js'
			},
			...common_config
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
