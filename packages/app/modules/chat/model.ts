import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { GlobalModel } from '@/context'
import { Util } from '@/models/common'
import { ipc } from '@/utils'

import type { Chat, Stack } from '@/types'

@injectable()
export default class Index {
	id = ''
	options = {} as Chat.Options

	constructor(
		public util: Util,
		public global: GlobalModel
	) {
		makeAutoObservable(this, { util: false, global: false, id: false }, { autoBind: true })
	}

	init(args: Stack.ModuleProps) {
		const { id, create } = args

		this.id = id

		this.options = this.global.stack.getTemp(id)

		// ipc.app.setRecent()
	}

	off() {}
}
