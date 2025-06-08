import { optimize, rspack } from '@rspack/core'

import { config } from './common'

import type { Configuration } from '@rspack/core'

const common_config = {
	resolve: { extensions: ['.js', '.ts'] },
	target: 'node',
	externalsPresets: {
		node: true
	},
	plugins: [
		new optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	],
	...config
} as Configuration

rspack(
	{
		entry: `${process.cwd()}/scripts/upload.ts`,
		output: {
			path: `${process.cwd()}/scripts/output`,
			clean: false,
			library: { type: 'commonjs' },
			filename: 'upload.js'
		},
		mode: 'production',
		...common_config
	},
	async (e, stats) => {
		const err = e || stats?.hasErrors?.()

		if (err) {
			console.log(stats?.toString({}))

			return
		}
	}
)
