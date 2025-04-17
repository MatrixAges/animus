import './_esm_'

import glob from 'fast-glob'
import { resolve } from 'path'

import { rspack } from '@rspack/core'

import { clean, modules, split_modules } from './build.utils'
import config from './config.rspack'

import type { Configuration } from '@rspack/core'

const { sync } = glob

const configs = [] as Array<Configuration>

clean()

const getEntry = (name: string, split?: boolean) => {
	if (!split) {
		return { entry: { main: `./packages/${name}/src/index.ts` } } as Configuration
	}

	const entry = sync([
		resolve(__dirname, `./packages/${name}/src/*.ts`),
		resolve(__dirname, `./packages/${name}/src/*.tsx`)
	]).reduce((total, item) => {
		const name = item.split('/').at(-1)!.split('.').at(0)!

		total[name] = item

		return total
	}, {})

	return { entry } as Configuration
}

const getOutput = (name: string, type: 'dev' | 'prod', split?: boolean) => {
	return {
		output: {
			filename: `${split ? '[name]' : 'index'}.${type}.mjs`,
			path: resolve(__dirname, `./packages/${name}/dist`),
			clean: false,
			module: true,
			library: { type: 'module' }
		}
	} as Configuration
}

const getOptimization = (dev: boolean) => {
	if (dev) {
		return {
			optimization: { minimize: false }
		} as Configuration
	}

	return {}
}

const getPlugins = (dev: boolean) => {
	return { plugins: [new rspack.DefinePlugin({ __DEV__: dev ? true : false })] } as Configuration
}

modules.forEach(name => {
	configs.push(
		{
			...config,
			...getEntry(name),
			...getOutput(name, 'dev'),
			...getOptimization(true),
			...getPlugins(true)
		},
		{
			...config,
			...getEntry(name),
			...getOutput(name, 'prod'),
			...getOptimization(false),
			...getPlugins(false)
		}
	)
})

split_modules.forEach(name => {
	configs.push(
		{
			...config,
			...getEntry(name, true),
			...getOutput(name, 'dev', true),
			...getOptimization(true),
			...getPlugins(true)
		},
		{
			...config,
			...getEntry(name, true),
			...getOutput(name, 'prod', true),
			...getOptimization(false),
			...getPlugins(false)
		}
	)
})

rspack(configs, async (e, stats) => {
	const err = e || stats?.hasErrors?.()

	if (err) {
		console.log(err)

		return
	}
})
