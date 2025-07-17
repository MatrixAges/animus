import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import { Util } from '@/models/common'
import { ipc, is_electron, info, getUserStoreOptions, store_options } from '@/utils'
import { setStoreWhenChange } from 'stk/mobx'
import { config_keys } from '@/appdata'
import { uniqBy } from 'es-toolkit'
import { diff } from 'just-diff'

import type { UpdateState, Workspace, List } from '@/types'

const { workspaces, workspace, favorite, recent } = config_keys

@injectable()
export default class Index {
	workspaces = [] as Array<Workspace>
	workspace = 'default'
	favorite = {} as List
	recent = {} as List
	update_silence = true
	update_status = null as UpdateState

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })
	}

	async init() {
		const off_app = await setStoreWhenChange([workspaces, workspace], this, store_options)

		this.util.acts = [off_app]

		if (!this.workspaces.length) {
			this.workspaces.push({ name: 'default', icon: 'cube', icon_type: 'icon' })

			this.workspaces = $copy(this.workspaces)
			this.workspace = 'default'

			ipc.app.workspace.add.mutate({ items: ['default'] })
		}

		if (is_electron) {
			this.onAppUpdate()
			this.checkUpdate(true)
		}

		this.getFavorite()
		this.getRecent()
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

	async getFavorite() {
		const res = await ipc.app.list.query.query({ module: 'global', filename: 'favorite' })

		if (!res) return

		this.favorite = res
	}

	async getRecent() {
		const res = await ipc.app.list.query.query({ module: 'global', filename: 'recent' })

		if (!res) return

		this.recent = res
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
	}
}
