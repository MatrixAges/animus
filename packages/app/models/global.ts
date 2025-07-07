import { singleton } from 'tsyringe'

import { Setting, Stack, Shortcuts, Layout, App } from '@/models'

@singleton()
export default class GlobalModel {
	constructor(
		public setting: Setting,
		public layout: Layout,
		public stack: Stack,
		public app: App,
		public shortcuts: Shortcuts
	) {}

	async init() {
		await this.setting.init()
		await this.layout.init()
		await this.stack.init()

		this.app.init()
		this.shortcuts.init()
	}

	off() {
		this.setting.off()
		this.layout.off()
		this.app.off()
		this.stack.off()
	}
}
