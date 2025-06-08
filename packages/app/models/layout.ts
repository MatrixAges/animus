import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import { Util } from '@/models'
import { ipc, is_electron } from '@/utils'
import { setStorageWhenChange } from 'stk/mobx'
import { getComputedStyleValue } from 'stk/utils'

@injectable()
export default class Index {
	menu_width = 0
	menu_fold = false
	blur = false
	maximize = false

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })
	}

	init() {
		this.util.acts = [setStorageWhenChange(['menu_width'], this)]

		if (this.menu_width === 0) {
			this.setDirTreeWidth(getComputedStyleValue(document.documentElement, '--menu_width'))

			return
		}

		this.setDirTreeWidth(this.menu_width)

		if (is_electron) this.onWindowBlur()
	}

	onWindowBlur() {
		ipc.app.on.subscribe(undefined, {
			onData: ({ type, value }) => {
				switch (type) {
					case 'blur':
						if (this.blur !== value) this.blur = value
						break
					case 'maximize':
						if (this.maximize !== value) this.maximize = value
						break
				}
			}
		})
	}

	toggleDirTreeVisible() {
		this.menu_fold = !this.menu_fold
	}

	setDirTreeWidth(v: number) {
		this.menu_width = v

		document.documentElement.style.setProperty('--menu_width', v + 'px')
	}

	off() {
		this.util.off()
	}
}
