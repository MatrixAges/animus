import dayjs from 'dayjs'
import { LRUMapWithDelete } from 'mnemonist'

import { read, write } from './fs'

import type { ListItem } from '@desktop/schemas'

type RecentItem = ListItem & { create_at: number }

interface Args {
	module: string
	filename: string
	items?: Array<ListItem>
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
							.map(key => [key, res[key]])
					),
					6
				)
			: new LRUMapWithDelete(6)
	) as LRUMapWithDelete<string, RecentItem>

	if (type === 'remove') {
		items.forEach(item => recent.remove(item.id))
	} else if (type === 'clear') {
		recent.clear()
	} else {
		items.forEach(item => recent.set(item.id, { ...item, create_at: dayjs().valueOf() }))
	}

	await write({ module, filename, data: Object.fromEntries(recent.entries()) })
}

export const getLRUMap = async (args: Omit<Args, 'id'>) => {
	const { module, filename } = args

	return read({ module, filename })
}
