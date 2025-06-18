import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import { Util } from '@/models'
import { ipc, is_electron, info } from '@/utils'

import type { UpdateState } from '@/types'

@injectable()
export default class Index {
	update_silence = true
	update_status = null as UpdateState

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })
	}

	init() {
		if (is_electron) {
			this.onAppUpdate()
			this.checkUpdate(true)
		}
	}

	onAppUpdate() {
		// ipc.app.update.subscribe(undefined, {
		// 	onData: args => {
		// 		switch (args.type) {
		// 			case 'can_update':
		// 				this.update_status = { type: 'has_update', version: args.value }
		// 				break
		// 			case 'cant_update':
		// 				if (!this.update_silence) $message.info($t('setting.general.update.no_update'))
		// 				break
		// 			case 'progress':
		// 				this.update_status = { type: 'downloading', percent: args.value }
		// 				break
		// 			case 'downloaded':
		// 				this.update_status = { type: 'downloaded' }
		// 				break
		// 		}
		// 	}
		// })
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
	}
}
