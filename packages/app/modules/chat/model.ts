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

		this.getFile()
	}

	async getFile() {
		const file = await ipc.file.read.query({ module: 'chat', filename: this.id })

		if (!file) return

		this.options = file.options

		const res = await ipc.chat.init.mutate({
			provider: this.options.model.provider,
			model: this.options.model.value,
			question: this.options.question
		})

		if (res?.err) return $message.error(res.err)
	}

	off() {}
}
