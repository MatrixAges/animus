import './_esm_'

import glob from 'fast-glob'
import { resolve } from 'path'
import { rollup } from 'rollup'

import plugin_babel from '@rollup/plugin-babel'
import plugin_commonjs from '@rollup/plugin-commonjs'
import plugin_json from '@rollup/plugin-json'
import plugin_node from '@rollup/plugin-node-resolve'
import plugin_replace from '@rollup/plugin-replace'
import plugin_terser from '@rollup/plugin-terser'

import { clean, external, modules, onwarn, split_modules } from './build.utils'

import type { RollupOptions } from 'rollup'

const { sync } = glob

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const externalLiveBindings = false
const maxParallelFileOps = 120

const common_plugins = [plugin_node({ extensions }), plugin_commonjs(), plugin_json()]

const getPlugins = (dev?: boolean) => {
	return [
		plugin_babel({
			babelHelpers: 'bundled',
			babelrc: false,
			configFile: false,
			exclude: '/**/node_modules/**',
			extensions,
			plugins: ['@babel/plugin-transform-optional-catch-binding'],
			presets: [
				['@babel/preset-typescript', { tsconfig: resolve('./tsconfig.build.json') }],
				['@babel/preset-react', { runtime: 'automatic' }]
			]
		}),
		plugin_replace({ __DEV__: dev ? 'true' : 'false', preventAssignment: true }),
		!dev && plugin_terser({ ecma: 2019, module: true })
	] as RollupOptions['plugins']
}

clean()

const buildModule = async (modules: Array<string>) => {
	modules.forEach(name => {
		const is_split_module = split_modules.includes(name)

		let input: RollupOptions['input']

		if (is_split_module) {
			input = sync([
				resolve(__dirname, `./packages/${name}/src/*.ts`),
				resolve(__dirname, `./packages/${name}/src/*.tsx`)
			])
		} else {
			input = resolve(__dirname, `./packages/${name}/src/index.ts`)
		}

		const dir = resolve(__dirname, `./packages/${name}/dist`)

		rollup({
			input,
			external,
			maxParallelFileOps,
			plugins: [...common_plugins, getPlugins(true)],
			onwarn
		}).then(({ write }) => {
			write({
				format: 'esm',
				dir,
				entryFileNames: is_split_module ? '[name].dev.mjs' : 'index.dev.mjs',
				externalLiveBindings
			})

			console.log(`${name} [dev] `)
		})

		rollup({
			input,
			external,
			maxParallelFileOps,
			plugins: [...common_plugins, getPlugins(false)],
			onwarn
		}).then(({ write }) => {
			write({
				format: 'esm',
				dir,
				entryFileNames: is_split_module ? '[name].prod.mjs' : 'index.prod.mjs',
				externalLiveBindings
			})

			console.log(`${name} [prod]`)
		})
	})
}

await buildModule(modules.concat(split_modules))

