import { Index as SearchIndex } from 'flexsearch'
import { decompressFromUint8Array } from 'lz-string'
import { makeAutoObservable } from 'mobx'
import { ofetch } from 'ofetch'

import { config_keys, index_options } from '@/appdata'
import { Lru } from '@/models/common'
import { conf } from '@/utils'
import { injectable } from 'tsyringe'

import type { IconType } from '@/types'
import type { ChangeEvent, CompositionEvent } from 'react'

@injectable()
export default class Index {
	visible = false
	compositing = false
	type = 'icon' as IconType
	icons = [] as Array<string>
	loading = false
	indexes = null as unknown as SearchIndex
	signal = 0

	get recent() {
		return this.type === 'icon' ? Object.keys(this.lru_icons.all) : Object.keys(this.lru_emojis.all)
	}

	constructor(
		public lru_icons: Lru,
		public lru_emojis: Lru
	) {
		makeAutoObservable(
			this,
			{
				lru_icons: false,
				lru_emojis: false,
				icons: false,
				indexes: false
			},
			{ autoBind: true }
		)
	}

	init() {
		this.lru_icons.init('icon_picker_recent_icons')
		this.lru_emojis.init('icon_picker_recent_emojis')
	}

	onOpenChange(v: boolean) {
		this.visible = v

		if (v) {
			this.indexes = new SearchIndex(index_options)

			this.getIndexes()
		} else {
			this.indexes.clear()
			this.indexes = null as unknown as SearchIndex
		}
	}

	onChangeType(v: Index['type']) {
		if (this.type === v) return

		this.type = v

		this.getIcons()
		this.getIndexes()
	}

	clearRecent() {
		this.type === 'icon' ? this.lru_icons.clear() : this.lru_emojis.clear()
	}

	async getIcons() {
		const { default: icons } = await import(`@/icons/en/${this.type}s.json`)

		this.icons = icons
		this.signal += 1
	}

	async getIndexes() {
		this.loading = true

		this.indexes.clear()

		const lang = await conf.get(config_keys.lang)

		const [_, { default: url }] = await Promise.all([
			this.getIcons(),
			import(`@/icons/${lang}/${this.type}s.index`)
		])

		const res = await ofetch(url, { responseType: 'arrayBuffer' })

		const indexes = JSON.parse(decompressFromUint8Array(new Uint8Array(res)))

		Object.keys(indexes).forEach(key => {
			const value = indexes[key]

			this.indexes.import(key, value)
		})

		this.loading = false
	}

	async onChangeInput(e: CompositionEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) {
		if (this.compositing) return

		const value = (e.target as HTMLInputElement).value

		if (!value) return this.getIcons()

		this.loading = true

		const res = await this.indexes.searchAsync(value)

		this.icons = res as Array<string>

		this.loading = false
	}

	off() {
		this.lru_icons.off()
		this.lru_emojis.off()
	}
}
