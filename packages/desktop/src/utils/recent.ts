import { LRUMapWithDelete } from 'mnemonist'

import { read, write } from './fs'

interface Args {
	module: string
	filename: string
	items?: Array<string>
	type?: 'remove' | 'clear'
	capacity?: number
}

export const setLRUMap = async (args: Args) => {
	const { module, filename, items = [], type, capacity = 6 } = args

	const res = await read({ module, filename })

	const recent = (
		res
			? LRUMapWithDelete.from(
					Object.fromEntries((res as Array<string>).reverse().map(key => [key, null])),
					capacity
				)
			: new LRUMapWithDelete(capacity)
	) as LRUMapWithDelete<string, null>

	if (type === 'remove') {
		items.forEach(item => recent.remove(item))
	} else if (type === 'clear') {
		recent.clear()
	} else {
		items.forEach(item => recent.set(item, null))
	}

	await write({ module, filename, data: Array.from(recent.keys()) })
}

export const getLRUMap = async (args: Omit<Args, 'id' | 'capacity'>) => {
	const { module, filename } = args

	return read({ module, filename })
}
