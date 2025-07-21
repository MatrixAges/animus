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
			? LRUMapWithDelete.from(
					Object.fromEntries(
						Object.keys(res)
							.reverse()
							.map(key => [key, null])
					),
					6
				)
			: new LRUMapWithDelete(6)
	) as LRUMapWithDelete<string, null>

	if (type === 'remove') {
		items.forEach(item => recent.remove(item))
	} else if (type === 'clear') {
		recent.clear()
	} else {
		items.forEach(item => recent.set(item, null))
	}

	await write({ module, filename, data: Object.fromEntries(recent.entries()) })
}

export const getLRUMap = async (args: Omit<Args, 'id'>) => {
	const { module, filename } = args

	return read({ module, filename })
}
