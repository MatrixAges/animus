import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import { Util } from '@/models/common'
import { ipc, is_electron, info, store_options } from '@/utils'
import { setStoreWhenChange } from 'stk/mobx'
import { config_keys } from '@/appdata'
import { uniqBy } from 'es-toolkit'
import { diff } from 'just-diff'

import type { UpdateState, Workspace } from '@/types'
import type { FileIndexs } from '@desktop/schemas'
import type { Lambda } from 'mobx'

const { workspaces, workspace } = config_keys

@injectable()
export default class Index {
	workspaces = [] as Array<Workspace>
	workspace = 'default'
	favorite_ids = [] as Array<string>
	recent_ids = [] as Array<string>
	favorite = [] as FileIndexs
	recent = [] as FileIndexs
	update_silence = true
	update_status = null as UpdateState

	off_favorite = null as unknown as Lambda
	off_recent = null as unknown as Lambda

	constructor(public util: Util) {
		makeAutoObservable(
			this,
			{ util: false, favorite_ids: false, recent_ids: false, off_favorite: false, off_recent: false },
			{ autoBind: true }
		)
	}

	async init() {
		const off = await setStoreWhenChange([workspaces, workspace], this, store_options)

		this.util.acts = [off]

		if (!this.workspaces.length) {
			this.workspaces.push({ name: 'default', icon: 'cube', icon_type: 'icon' })

			this.workspaces = $copy(this.workspaces)
			this.workspace = 'default'

			await ipc.app.workspace.add.mutate({ items: ['default'] })
		}

		if (is_electron) {
			this.onAppUpdate()
			this.checkUpdate(true)
		}

		this.subscribe()
	}

	subscribe() {
		const off = ipc.file.watch.subscribe(
			[
				{ type: 'workspace', path: '/favorite.json' },
				{ type: 'workspace', path: '/recent.json' }
			],
			{
				onData: res => {
					if (res['/favorite.json']) {
						this.favorite = res['/favorite.json']

						this.subscribeRecent()
					}

					if (res['/recent.json']) {
						this.recent = res['/recent.json']

						this.subscribeRecent()
					}
				}
			}
		)

		this.util.acts.push(off.unsubscribe)
	}

	subscribeFavorite() {
		this.off_favorite?.()

		const off = ipc.file.watch.subscribe(
			this.favorite_ids.map(item => ({ type: 'workspace', path: `/file_index/${item}.json` })),
			{
				onData: res => {
					if (res) this.favorite = Object.values(res)
				}
			}
		)

		this.off_favorite = off.unsubscribe
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

	onSelectWorkspace(index: number) {
		this.workspace = this.workspaces[index].name
	}

	setWorkspaces(v: Index['workspaces']) {
		const items = uniqBy(
			v.filter(item => item.name && item.icon),
			item => item.name
		)

		const res = diff(this.workspaces, items)
		const add_items = res.filter(item => item.op === 'add').map(item => item.value.name)

		const remove_items = res
			.filter(item => item.op === 'remove')
			.map(item => this.workspaces[item.path.at(0) as number].name)

		this.workspaces = $copy(items)

		if (add_items.length) ipc.app.workspace.add.mutate({ items: add_items })
		if (remove_items.length) ipc.app.workspace.remove.mutate({ items: remove_items })
	}

	onAppUpdate() {
		const off = ipc.app.onUpdate.subscribe(undefined, {
			onData: args => {
				switch (args.type) {
					case 'can_update':
						this.update_status = { type: 'has_update', version: args.value }
						break
					case 'cant_update':
						if (!this.update_silence) $message.info($t('setting.general.update.no_update'))
						break
					case 'progress':
						this.update_status = { type: 'downloading', percent: args.value }
						break
					case 'downloaded':
						this.update_status = { type: 'downloaded' }
						break
					case 'error':
						$message.error(args.value)

						this.update_status = null
						break
				}
			}
		})

		this.util.acts.push(off.unsubscribe)
	}

	checkUpdate(silence?: boolean) {
		if (!silence) this.update_silence = false

		ipc.app.checkUpdate.query()
	}

	install() {
		ipc.app.install.query()
	}

	async download() {
		await info({
			title: $t('notice'),
			content: $t('setting.general.update.install_backup'),
			zIndex: 300000
		})

		ipc.app.download.query()
	}

	off() {
		this.util.off()
		this.off_favorite?.()
		this.off_recent?.()
	}
}
