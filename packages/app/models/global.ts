import { makeAutoObservable } from 'mobx'
import { singleton } from 'tsyringe'

import { Setting } from '@/models'

@singleton()
export default class GlobalModel {
	constructor(public setting: Setting) {
		makeAutoObservable(this, { setting: false }, { autoBind: true })
	}

	init() {}

	off() {
		this.setting.off()
	}
}
