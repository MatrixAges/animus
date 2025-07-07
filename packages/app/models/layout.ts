import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import { Util } from '@/models'
import { ipc, is_electron, set_store_options } from '@/utils'
import { setStoreWhenChange } from 'stk/mobx'
import { commands, config_keys } from '@/appdata'

const { sidebar_fold } = config_keys

@injectable()
export default class Index {
	sidebar_fold = false
	maximize = false

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })
	}

	async init() {
		const off = await setStoreWhenChange([sidebar_fold], this, set_store_options)

		this.util.acts = [off]

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
