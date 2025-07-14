import { makeAutoObservable } from 'mobx'

import { emojis, icons } from '@/icons'

import type { IconType } from '@/types'
import type { ChangeEvent } from 'react'

export default class Index {
	type = 'icon' as IconType
	input = ''
	icons = icons as Record<string, Array<string>>

	constructor() {
		makeAutoObservable(this, { icons: false }, { autoBind: true })
	}

	onChangeType(v: Index['type']) {
		switch (v) {
			case 'icon':
				this.icons = icons
				break
			case 'emoji':
				this.icons = emojis
				break
		}

		this.type = v
	}

	onChangeInput(e: ChangeEvent<HTMLInputElement>) {}
}
