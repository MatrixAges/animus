import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models/common'
import { ipc } from '@/utils'

import type { List } from '@/types'

@injectable()
export default class Index {
	recent = {} as List

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })
	}

	async init() {
		this.subscribe()
	}

	subscribe() {
		const off = ipc.file.watch.subscribe([{ type: 'workspace', path: '/chat/recent.json' }], {
			onData: res => {
				if (res['/chat/recent.json']) {
					this.recent = res['/chat/recent.json']
				}
			}
		})

		this.util.acts.push(off.unsubscribe)
	}

	off() {
		this.util.off()
	}
}
