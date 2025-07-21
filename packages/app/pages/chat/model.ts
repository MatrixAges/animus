import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models/common'
import { confirm, ipc, getValuedObject } from '@/utils'
import { GlobalModel } from '@/context'

import type { FileIndex, FileIndexs } from '@desktop/schemas'
import type { Lambda } from 'mobx'

@injectable()
export default class Index {
	recent_ids = [] as Array<string>
	recent = {} as Record<string, FileIndex>
	list = [] as FileIndexs
	visible_list_modal = false

	off_recent = null as unknown as Lambda

	constructor(
		public util: Util,
		public global: GlobalModel
	) {
		makeAutoObservable(this, { util: false, global: false, recent_ids: false }, { autoBind: true })
	}

	async init() {
		this.subscribe()
	}

	toggleListModal() {
		this.visible_list_modal = !this.visible_list_modal

		if (this.visible_list_modal) this.getList()
	}

	setRecentItems(index: number, v: Partial<FileIndex>) {
		const key = Object.keys(this.recent)[index]

		this.recent[key] = { ...this.recent[key], ...v }

		this.recent = $copy(this.recent)
	}

	setListItems(index: number, v: Partial<FileIndex>) {
		this.list[index] = { ...this.list[index], ...v }

		this.list = $copy(this.list)
	}

	subscribe() {
		const off = ipc.file.watch.subscribe([{ type: 'workspace', path: '/chat/recent.json' }], {
			onData: res => {
				if (res['/chat/recent.json']) {
					this.recent_ids = res['/chat/recent.json']

					this.subscribeRecent(true)
				}
			}
		})

		this.util.acts.push(off.unsubscribe)
	}

	subscribeRecent(reset?: boolean) {
		this.off_recent?.()

		const off = ipc.file.watch.subscribe(
			this.recent_ids.map(item => ({ type: 'workspace', path: `/file_index/${item}.json` })),
			{
				onData: res => {
					if (res) {
						const items = Object.values(res)

						items.forEach((item, index) => {
							if (item === undefined) {
								const id = this.recent_ids[index]

								this.recent_ids[index] = ''

								ipc.file.recent.remove.mutate({ module: 'chat', id })
							}
						})

						this.recent_ids = this.recent_ids.filter(item => item !== '')

						res = res = getValuedObject(res)

						if (reset) {
							this.recent = res
						} else {
							this.recent = {
								...this.recent,
								...res
							}
						}
					}

					reset = false
				}
			}
		)

		this.off_recent = off.unsubscribe
	}

	async getList() {
		this.list = await ipc.file.list.query.query({ module: 'chat', filename: 'list' })

		console.log($copy(this.list))
	}

	async removeListItem(id: string, index: number) {
		const res = await confirm({
			title: $t('notice'),
			content: '确认删除？删除列表想将会删除本地保存的文件，不可恢复！'
		})

		if (!res) return

		this.list.splice(index, 1)

		this.list = $copy(this.list)

		this.global.stack.removeView(id)

		ipc.file.list.remove.mutate({ module: 'global', filename: 'favorite', id })
		ipc.file.list.remove.mutate({ module: 'chat', filename: 'list', id })
		ipc.file.recent.remove.mutate({ module: 'chat', id })
	}

	off() {
		this.util.off()
		this.off_recent?.()
	}
}
