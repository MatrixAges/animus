import { defineConfig } from '@rslib/core'

import type { RslibConfig } from '@rslib/core'

const is_dev = process.env.NODE_ENV === 'development'
const is_prod = process.env.NODE_ENV === 'production'

const prod_output = {} as RslibConfig['output']

if (is_prod) prod_output!['minify'] = {}

export default defineConfig({
	mode: is_dev ? 'development' : 'production',
	lib: [{ format: 'esm' }],
	source: {
		entry: {
			index: './src/index.ts',
			preload: './build/preload.ts',
			notarize: './build/notarize.ts'
		},
		decorators: { version: 'legacy' }
	},
	output: {
		sourceMap: is_dev,
		target: 'node',
		cleanDistPath: is_prod,
		filename: { js: '[name].js' },
		...prod_output
	},
	performance: { chunkSplit: { strategy: 'split-by-module' } },
	tools: { rspack: { target: 'electron-main' } }
})
