import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models/common'
import { ipc } from '@/utils'

import type { FileIndexs } from '@desktop/schemas'
import type { Lambda } from 'mobx'

@injectable()
export default class Index {
	recent_ids = [] as Array<string>
	recent = {} as FileIndexs

	off_recent = null as unknown as Lambda

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
					this.recent_ids = res['/chat/recent.json']

					this.subscribeRecent()
				}
			}
		})

		this.util.acts.push(off.unsubscribe)
	}

	subscribeRecent() {
		this.off_recent?.()

		const off = ipc.file.watch.subscribe(
			this.recent_ids.map(item => ({ type: 'workspace', path: `/file_index/${item}.json` })),
			{
				onData: res => {
					if (res) this.recent = Object.values(res)
				}
			}
		)

		this.off_recent = off.unsubscribe
	}

	off() {
		this.util.off()
		this.off_recent?.()
	}
}
