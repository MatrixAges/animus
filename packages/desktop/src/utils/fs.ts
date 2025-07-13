import { join } from 'path'
import { readFile, writeFile } from 'atomically'
import to from 'await-to-js'

import { user_data_path } from '@desktop/utils'

interface Args {
	module: string
	filename: string
	data: any
}

export const write = async (args: Args) => {
	const { module, filename, data } = args

	await writeFile(join(user_data_path, `/${module}/${filename}.json`), JSON.stringify(data, null, 6))
}

export const read = async (args: Omit<Args, 'data'>) => {
	const { module, filename } = args

	const [err, res] = await to(readFile(join(user_data_path, `/${module}/${filename}.json`)))

	if (err) return null

	return JSON.parse(res.toString())
}
