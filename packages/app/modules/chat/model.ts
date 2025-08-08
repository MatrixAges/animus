import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models/common'
import { ipc } from '@/utils'

import type { Chat, Stack } from '@/types'
import type { Message } from 'fst/chat'

@injectable()
export default class Index {
	id = ''
	options = {} as Chat.Options
	messages = [] as Array<Message>

	loading = false
	signal = 0

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false, id: false, messages: false }, { autoBind: true })
	}

	init(args: Stack.ModuleProps) {
		const { id } = args

		this.id = id

		this.sub()
	}

	sub() {
		ipc.chat.init.subscribe(this.id, {
			onData: res => {
				switch (res.type) {
					case 'init':
						this.messages = res.messages as Array<Message>
						this.signal += 1

						break
					case 'sync_options':
						this.options = res.options as Chat.Options

						break
					case 'sync_loading':
						this.loading = res.loading

						break
				}
			}
		})
	}

	off() {}
}
