import { singleton } from 'tsyringe'

import { Setting, Stack, Shortcuts, Layout, App } from '@/models'

@singleton()
export default class GlobalModel {
	constructor(
		public app: App,
		public setting: Setting,
		public stack: Stack,
		public shortcuts: Shortcuts,
		public layout: Layout
	) {}

	init() {
		this.app.init()
		this.setting.init()
		this.stack.init()
		this.shortcuts.init()
		this.layout.init()
	}

	off() {
		this.app.off()
		this.setting.off()
		this.stack.off()
		this.layout.off()
	}
}
