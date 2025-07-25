import { singleton } from 'tsyringe'

import { Setting, Stack, Shortcuts, Layout, App, Provider } from '@/models'

@singleton()
export default class GlobalModel {
	constructor(
		public setting: Setting,
		public layout: Layout,
		public stack: Stack,
		public app: App,
		public provider: Provider,
		public shortcuts: Shortcuts
	) {}

	async init() {
		await this.setting.init()
		await this.layout.init()
		await this.stack.init()
		await this.app.init()
		await this.provider.init()

		this.shortcuts.init()
	}

	off() {
		this.setting.off()
		this.layout.off()
		this.app.off()
		this.stack.off()
	}
}
