import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models/common'
import { ipc } from '@/utils'

import type { Chat, Stack } from '@/types'
import type Conversation from 'fst/conversation'
import type { Conversation as NConversation } from 'fst/conversation'

@injectable()
export default class Index {
	id = ''
	options = {} as Chat.Options
	messages = [] as Conversation['messages']
	current = ''
	loading = false

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false, id: false }, { autoBind: true })
	}

	init(args: Stack.ModuleProps) {
		const { id } = args

		this.id = id

		// this.sub()
	}

	sub() {
		ipc.chat.init.subscribe(
			{ id: this.id },
			{
				onData: res => {
					console.log(res)
					switch (res.type) {
						case 'ask':
							this.messages.push(res.message as NConversation.Message)

							break
						case 'sync':
							this.messages = res.messages
							this.current = res.current

							break
						case 'streaming':
							this.current += res.text

							break
						case 'sync_options':
							this.options = res.options as Chat.Options

							break
						case 'sync_loading':
							this.loading = res.loading

							break
					}
				}
			}
		)
	}

	off() {}
}
