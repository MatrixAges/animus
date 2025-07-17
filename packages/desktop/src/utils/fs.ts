import { join } from 'path'
import { readFile, writeFile } from 'atomically'
import to from 'await-to-js'
import { deepmerge } from 'deepmerge-ts'

import { user_data_path } from '@desktop/utils'

interface Args {
	filename: string
	data: any
	module?: string
	ext?: string
}

export const write = async (args: Args & { merge?: boolean; default_value?: any }) => {
	const { filename, data, merge, default_value = {}, module, ext = 'json' } = args

	let target_data = data

	if (merge) {
		const prev_data = await read({ module, filename })

		target_data = deepmerge(prev_data || default_value, data)
	}

	await writeFile(
		join(user_data_path, module && module !== 'global' ? `/${module}` : '', `/${filename}.${ext}`),
		JSON.stringify(target_data, null, 6)
	)
}

export const read = async (args: Omit<Args, 'data'>) => {
	const { filename, module, ext = 'json' } = args

	const [err, res] = await to(
		readFile(join(user_data_path, module && module !== 'global' ? `/${module}` : '', `/${filename}.${ext}`))
	)

	if (err) return undefined

	return JSON.parse(res.toString())
}
