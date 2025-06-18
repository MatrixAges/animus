import { deepmerge } from 'deepmerge-ts'

import { rslib } from '../../config'

import type { RslibConfig } from '@rslib/core'

export default deepmerge(rslib, {
	lib: [
		{
			source: { entry: { main: './src/main/index.ts' } },
			format: 'cjs',
			externals: ['electron'],
			tools: { rspack: { target: 'electron-main' } }
		},
		{
			source: { entry: { renderer: './src/renderer/index.ts' } },
			format: 'esm'
		}
	],
	output: {
		filename: {
			js: '[name]/index.js'
		}
	}
} as Partial<RslibConfig>)
