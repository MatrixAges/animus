import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models'

@injectable()
export default class Index {
	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })
	}

	async init() {}

	off() {
		this.util.off()
	}
}
