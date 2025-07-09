import { join } from 'path'
import { readFile, writeFile } from 'atomically'
import to from 'await-to-js'
import { app } from 'electron'

import { productName } from '../../package.json'

interface Args {
	module: string
	filename: string
	data: any
}

export const write = async (args: Args) => {
	const { module, filename, data } = args

	await writeFile(
		join(app.getPath('documents'), `/.${productName}/${module}/${filename}.json`),
		JSON.stringify(data, null, 6)
	)
}

export const read = async (args: Omit<Args, 'data'>) => {
	const { module, filename } = args

	const [err, res] = await to(
		readFile(join(app.getPath('documents'), `/.${productName}/${module}/${filename}.json`))
	)

	if (err) return null

	return JSON.parse(res.toString())
}
