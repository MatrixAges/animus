import { deepmerge } from 'deepmerge-ts'

import { rslib } from '../../config'

import type { RslibConfig } from '@rslib/core'

const modules = ['llm', 'prompt', 'graphii', 'chat']

export default deepmerge(rslib, {
	lib: [{ format: 'esm', dts: true }],
	output: { target: 'node' },
	source: {
		entry: modules.reduce(
			(total, item) => {
				total[item] = `./src/${item}/index.ts`

				return total
			},
			{} as Record<string, string>
		)
	}
} as Partial<RslibConfig>)
