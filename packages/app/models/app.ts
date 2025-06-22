import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import { Util } from '@/models'
import { ipc, is_electron, info } from '@/utils'

import type { UpdateState, Stack } from '@/types'

const favorite_items = [
	{ id: '6', module: 'chat', icon: 'open-ai-logo', name: 'OpenAI Translator' },
	{ id: '7', module: 'chat', icon: 'google-chrome-logo', name: 'Web Designer' },
	{ id: '8', module: 'chat', icon: 'shopping-cart-simple', name: 'Shopping Director' },
	{ id: '1', module: 'note', icon: 'dna', name: 'Ethics Overview' },
	{ id: '3', module: 'note', icon: 'head-circuit', name: 'Deep Learning Trends' },
	{ id: '5', module: 'note', icon: 'bandaids', name: 'AI in Healthcare' }
] as Array<Stack.Item>

const recent_items = [
	{ id: '6', module: 'chat', icon: 'open-ai-logo', name: 'Insight Chat' },
	{ id: '7', module: 'chat', icon: 'google-chrome-logo', name: 'Smart Web' },
	{ id: '8', module: 'chat', icon: 'shopping-cart-simple', name: 'Cognitive Shop' },
	{ id: '1', module: 'note', icon: 'dna', name: 'Ethics Lab' },
	{ id: '3', module: 'note', icon: 'head-circuit', name: 'Trends Vision' },
	{ id: '5', module: 'note', icon: 'bandaids', name: 'Health Mind' }
] as Array<Stack.Item>

@injectable()
export default class Index {
	favorite_items = favorite_items
	recent_items = recent_items
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
	}
}
