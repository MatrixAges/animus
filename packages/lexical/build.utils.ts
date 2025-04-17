import glob from 'fast-glob'
import fs from 'fs-extra'
import { resolve } from 'path'

import type { RollupOptions } from 'rollup'

const { sync } = glob
const { readFileSync, removeSync } = fs

const lexical_react_package_json = JSON.parse(readFileSync('./packages/lexical-react/package.json').toString())
const shared_package_json = JSON.parse(readFileSync('./packages/shared/package.json').toString())

export const modules = [
	'lexical',
	'lexical-clipboard',
	'lexical-file',
	'lexical-headless',
	'lexical-history',
	'lexical-html',
	'lexical-link',
	'lexical-list',
	'lexical-markdown',
	'lexical-offset',
	'lexical-overflow',
	'lexical-plain-text',
	'lexical-rich-text',
	'lexical-selection',
	'lexical-text',
	'lexical-utils'
]

export const split_modules = ['shared', 'lexical-react']

export const packages = sync([resolve(__dirname, './packages/*/package.json')]).map(
	path => JSON.parse(readFileSync(path).toString()).name
)

export const clean = () => {
	removeSync(resolve('./.ts-temp'))

	modules.concat(split_modules).forEach(name => removeSync(resolve(__dirname, `./packages/${name}/dist`)))
}

export const onwarn: RollupOptions['onwarn'] = warning => {
	if (warning.code === 'CIRCULAR_DEPENDENCY') {
	} else if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
		console.error(warning.message || warning)
	} else if (
		warning.code === 'SOURCEMAP_ERROR' &&
		warning.message.endsWith(`Can't resolve original location of error.`)
	) {
	} else if (typeof warning.code === 'string') {
		console.error(warning.message || warning)

		process.exit(1)
	} else {
		console.warn(warning.message || warning)
	}
}

export const getExternals = () => {
	const lexical_react_libs = Object.keys(lexical_react_package_json.exports).map(item => item.replace('./', ''))
	const shared_libs = Object.keys(shared_package_json.exports).map(item => item.replace('./', ''))

	const external_libs = ['react', 'react-dom', 'ahooks', '@openages/stk'] as Array<string>

	packages.forEach(item => {
		external_libs.push(item)
	})

	lexical_react_libs.forEach(item => {
		external_libs.push(`@lexical/react/${item}`)
	})

	shared_libs.forEach(item => {
		external_libs.push(`shared/${item}`)
	})

	return external_libs
}

export const external: RollupOptions['external'] = path => {
	return getExternals().includes(path)
}
