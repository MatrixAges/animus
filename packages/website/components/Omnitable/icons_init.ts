import { init } from 'emoji-mart'

import data from '@emoji-mart/data'

import icons from './icons'

import type { EmojiMartData } from '@emoji-mart/data'

export type Icon = {
	id: string
	name: string
	keywords: Array<string>
	skins: Array<{ src: string }>
}

export type IconType = (typeof icons)[number]

const custom_emojis = icons.reduce(
	(total, key) => {
		const target = {
			id: key,
			name: key,
			keywords: [],
			skins: [
				{
					src: require(`./icons/${key}.svg?src`)
				}
			]
		}

		total[key] = target

		return total
	},
	{} as Record<string, Icon>
)

init({ data: { ...data, emojis: { ...(data as EmojiMartData).emojis, ...custom_emojis } } })
