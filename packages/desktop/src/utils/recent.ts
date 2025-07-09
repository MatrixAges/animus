import dayjs from 'dayjs'
import { LRUMapWithDelete } from 'mnemonist'

import { read, write } from './fs'

interface Args {
	module: string
	filename: string
	items?: Array<string>
	type?: 'remove' | 'clear'
}

export const setLRUMap = async (args: Args) => {
	const { module, filename, items = [], type } = args

	const res = await read({ module, filename })

	const recent = (
		res
			? LRUMapWithDelete.from<string, number>(
					Object.fromEntries(
						Object.keys(res)
							.reverse()
							.map(key => [key, res[key]])
					),
					12
				)
			: new LRUMapWithDelete<string, number>(12)
	) as LRUMapWithDelete<string, number>

	if (type === 'remove') {
		items.forEach(item => recent.remove(item))
	} else if (type === 'clear') {
		recent.clear()
	} else {
		items.forEach(item => recent.set(item, dayjs().valueOf()))
	}

	await write({ module, filename, data: Object.fromEntries(recent.entries()) })
}

export const getLRUMap = async (args: Omit<Args, 'id'>) => {
	const { module, filename } = args

	return read({ module, filename })
}
