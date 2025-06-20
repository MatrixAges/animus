import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import { Util } from '@/models'
import { ipc, is_electron } from '@/utils'
import { setStorageWhenChange } from 'stk/mobx'
import { commands } from '@/appdata'

@injectable()
export default class Index {
	sidebar_width = 0
	sidebar_fold = false
	maximize = false

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })
	}

	init() {
		this.util.acts = [setStorageWhenChange(['sidebar_width', 'sidebar_fold'], this)]

		this.setDirTreeWidth(this.sidebar_width, true)

		if (is_electron) this.onWindowBlur()

		this.on()
	}

	onWindowBlur() {
		const off = ipc.app.onApp.subscribe(undefined, {
			onData: ({ type, value }) => {
				switch (type) {
					case 'maximize':
						if (this.maximize !== value) this.maximize = value
						break
				}
			}
		})

		this.util.acts.push(off.unsubscribe)
	}

	setDirTreeWidth(v: number, initial?: boolean) {
		if (!initial) this.sidebar_width = v

		document.documentElement.style.setProperty('--sidebar_width', v + 'px')
	}

	toggleSidebar() {
		this.sidebar_fold = !this.sidebar_fold
	}

	on() {
		$app.Event.on(commands['app.toggleSidebar'], this.toggleSidebar)
	}

	off() {
		this.util.off()

		$app.Event.off(commands['app.toggleSidebar'], this.toggleSidebar)
	}
}
