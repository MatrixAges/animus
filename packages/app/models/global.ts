import { makeAutoObservable } from 'mobx'
import { singleton } from 'tsyringe'

import { Setting, Stack, Shortcuts } from '@/models'

@singleton()
export default class GlobalModel {
	constructor(
		public setting: Setting,
		public stack: Stack,
		public shortcuts: Shortcuts
	) {
		makeAutoObservable(this, { setting: false, stack: false, shortcuts: false }, { autoBind: true })
	}

	init() {
		this.setting.init()
		this.stack.init()
		this.shortcuts.init()
	}

	off() {
		this.setting.off()
		this.stack.off()
		this.shortcuts.off()
	}
}
