import { Index as SearchIndex } from 'flexsearch'
import { decompressFromBase64 } from 'lz-string'
import { makeAutoObservable } from 'mobx'

import { config_keys, index_options } from '@/appdata'
import { emojis, icons } from '@/icons'
import { conf } from '@/utils'

import type { IconType } from '@/types'
import type { ChangeEvent, CompositionEvent } from 'react'

export default class Index {
	visible = false
	compositing = false
	type = 'icon' as IconType
	icons = icons as Array<string>
	loading = false
	indexes = null as unknown as SearchIndex
	signal = 0

	constructor() {
		makeAutoObservable(this, { icons: false, indexes: false }, { autoBind: true })
	}

	onOpenChange(v: boolean) {
		this.visible = v

		if (v) {
			this.indexes = new SearchIndex(index_options)

			this.loadIndexes()
		} else {
			this.indexes.clear()
			this.indexes = null as unknown as SearchIndex
		}
	}

	getIcons(v?: Index['type']) {
		switch (v || this.type) {
			case 'icon':
				this.icons = icons
				break
			case 'emoji':
				this.icons = emojis
				break
		}

		this.signal += 1
	}

	onChangeType(v: Index['type']) {
		this.getIcons(v)

		this.type = v

		this.loadIndexes()
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

	async loadIndexes() {
		this.loading = true

		this.indexes.clear()

		const lang = await conf.get(config_keys.lang)
		const { default: res } = await import(`@/icons/${lang}/${this.type}s.index`)

		const indexes = JSON.parse(decompressFromBase64(res))

		Object.keys(indexes).forEach(key => {
			const value = indexes[key]

			this.indexes.import(key, value)
		})

		this.loading = false
	}
}
