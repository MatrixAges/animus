import { chat_naming, chat_summary, translate } from 'fst/prompt'
import { makeAutoObservable } from 'mobx'

import { ipc } from '@/utils'

export default class Index {
	tab = 'config' as 'config' | 'prompt'
	configs = []
	prompts = {
		naming: { prompt: chat_naming },
		summary: { prompt: chat_summary },
		translate: { prompt: translate }
	} as unknown as Record<string, { model: string; prompt: string }>

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	async init() {
		await this.getConfigs()
	}

	onChangeTab(v: Index['tab']) {
		this.tab = v

		switch (v) {
			case 'config':
				this.getConfigs()
				break
			case 'prompt':
				this.getPrompts()
				break
		}
	}

	async getConfigs() {
		const res = await ipc.file.read.query({ module: 'global', filename: 'preset_configs' })

		if (!res) return

		this.configs = res
	}

	async setConfigs(v: Index['configs']) {
		this.configs = v

		ipc.file.write.mutate({ module: 'global', filename: 'preset_configs', data: v })
	}

	async getPrompts() {
		const res = await ipc.file.read.query({ module: 'global', filename: 'preset_prompts' })

		if (!res) return

		this.prompts = res
	}

	async setPrompts(v: Index['prompts']) {
		this.prompts = v

		ipc.file.write.mutate({ module: 'global', filename: 'preset_prompts', data: v })
	}
}
