import hotkeys from 'hotkeys-js'
import { makeAutoObservable } from 'mobx'

import { shortcuts } from '@/appdata'

import type { Shortcut } from '@/types'

export default class Index {
	keys = shortcuts as Array<Shortcut>

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	init() {
		this.on()
	}

	getKeybinds(key_bindings: Index['keys'][number]['key_bindings']) {
		return typeof key_bindings === 'string' ? key_bindings : key_bindings[window?.$shell?.platform || 'darwin']
	}

	on() {
		this.keys.map(item => {
			const key_bindings = this.getKeybinds(item.key_bindings)

			hotkeys(key_bindings, item.options || {}, e => {
				if (item.special_key) {
					if (e.key.toLowerCase() === item.special_key) {
						e.preventDefault()

						$app.Event.emit(item.event_path)
					}
				} else {
					e.preventDefault()

					$app.Event.emit(item.event_path)
				}
			})
		})
	}

	off() {
		this.keys.map(item => hotkeys.unbind(this.getKeybinds(item.key_bindings)))
	}
}
