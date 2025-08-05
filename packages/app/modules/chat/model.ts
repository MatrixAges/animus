import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models/common'
import { ipc } from '@/utils'

import type { Chat, Stack } from '@/types'

@injectable()
export default class Index {
	id = ''
	options = {} as Chat.Options

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false, id: false }, { autoBind: true })
	}

	init(args: Stack.ModuleProps) {
		const { id } = args

		this.id = id

		this.sub()
	}

	sub() {
		ipc.chat.conversation.subscribe({ id: this.id }, { onData: res => {} })
	}

	off() {}
}
