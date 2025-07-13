import { makeAutoObservable } from 'mobx'

import { icons } from '@/appdata'

import type { IconType } from '@/types'
import type { ChangeEvent } from 'react'

export default class Index {
	type = 'icon' as IconType
	input = ''
	icons = icons

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	onChange(e: ChangeEvent<HTMLInputElement>) {}
}
