import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models/common'
import { getUserStoreOptions } from '@/utils'
import { setStoreWhenChange } from 'stk/mobx'
import { config_keys } from '@/appdata'
import { id as ID } from 'stk/common'
import { GlobalModel } from '@/context'
import Decimal from 'decimal.js'
import { ipc } from '@/utils'
import dayjs from 'dayjs'

import type { IProps } from './types'
import type { Stack, Chat } from '@/types'
import type { FileIndex } from '@desktop/schemas'

@injectable()
export default class Index {
	system_prompt = ''
	prompt_rewriting = false
	use_preset = false
	newline_by_enter = false
	web_search_enabled = false
	web_search_engine = ''
	temperature = 0.9
	top_p = 0.9
	max_ouput_tokens = 0
	select_model = [] as Array<Chat.Options['model']>

	ref_textarea = null as unknown as HTMLTextAreaElement
	compositing = false

	constructor(
		public util: Util,
		public global: GlobalModel
	) {
		makeAutoObservable(
			this,
			{ util: false, global: false, ref_textarea: false, compositing: false },
			{ autoBind: true }
		)
	}

	async init(args: { store_options?: IProps['store_options'] }) {
		const { store_options } = args

		const off = await setStoreWhenChange(
			[
				{ [config_keys['chat.config.prompt_rewriting']]: 'prompt_rewriting' },
				{ [config_keys['chat.config.use_preset']]: 'use_preset' },
				{ [config_keys['chat.config.newline_by_enter']]: 'newline_by_enter' },
				{ [config_keys['chat.config.web_search.enabled']]: 'web_search_enabled' },
				{ [config_keys['chat.config.web_search.engine']]: 'web_search_engine' },
				{ [config_keys['chat.setting.temperature']]: 'temperature' },
				{ [config_keys['chat.setting.top_p']]: 'top_p' },
				{ [config_keys['chat.setting.max_ouput_tokens']]: 'max_ouput_tokens' },
				{ [config_keys['chat.select_model']]: 'select_model' }
			],
			this,
			store_options ?? getUserStoreOptions('global', 'chatbox')
		)

		this.util.acts = [off]

		this.on()
	}

	async submit() {
		const value = this.ref_textarea.value

		if (!value) return
		if (!this.select_model.length) return

		const name = value.replace(/[\r\n]+/g, '').slice(0, 30)
		const stack = this.global.stack
		const stack_item = { type: 'module', module: 'chat', name } as Stack.Item
		const now = dayjs().valueOf()

		const options = {
			type: 'chat',
			question: value,
			system_prompt: this.system_prompt,
			prompt_rewriting: this.prompt_rewriting,
			newline_by_enter: this.newline_by_enter,
			web_search_enabled: this.web_search_enabled,
			web_search_engine: this.web_search_engine,
			temperature: this.temperature,
			top_p: this.top_p,
			max_ouput_tokens: this.max_ouput_tokens
		} as Chat.Options

		if (this.select_model.length === 1) {
			const id = ID()
			const model = $copy(this.select_model[0])
			const target_options = { ...options, model }

			const file_index = { module: 'chat', id, name, create_at: now } as FileIndex

			stack.add({ ...stack_item, id })

			ipc.file.write.mutate({ module: 'file_index', filename: id, data: file_index })
			ipc.file.write.mutate({ module: 'chat', filename: id, data: { options: target_options } })
			ipc.file.list.add.mutate({ module: 'chat', filename: 'list', items: [id] })
			ipc.file.recent.add.mutate({ module: 'chat', items: [id] })
		} else {
			const width = new Decimal(Decimal.div(100, this.select_model.length).toFixed(2)).toNumber()
			const file_indexs = [] as Array<string>

			this.select_model.forEach((item, index) => {
				const id = ID()
				const view = { ...stack_item, id, active: true }
				const target_options = { ...options, model: $copy(item) }

				const file_index = { module: 'chat', id, name, create_at: now } as FileIndex

				file_indexs.push(id)

				if (stack.columns[index]) {
					const views = stack.columns[index].views

					stack.columns[index].width = width

					views.forEach(view => (view.active = false))
					views.push(view)
				} else {
					stack.columns[index] = { views: [view], width } as Stack.Column
				}

				ipc.file.write.mutate({ module: 'file_index', filename: id, data: file_index })
				ipc.file.write.mutate({ module: 'chat', filename: id, data: { options: target_options } })
			})

			stack.columns = $copy(stack.columns)

			ipc.file.list.add.mutate({ module: 'chat', filename: 'list', items: file_indexs })
			ipc.file.recent.add.mutate({ module: 'chat', items: file_indexs })
		}

		this.ref_textarea.value = ''
	}

	onKeydown(e: KeyboardEvent) {
		if (this.compositing) return
		if (e.key !== 'Enter') return

		const should_submit = this.newline_by_enter
			? e.shiftKey || e.metaKey || e.ctrlKey
			: !(e.shiftKey || e.metaKey || e.ctrlKey)

		if (should_submit) {
			e.preventDefault()

			this.submit()
		}
	}

	addKeydownEventListener() {
		this.ref_textarea.addEventListener('keydown', this.onKeydown)
	}

	removeKeydownEventListener() {
		this.ref_textarea.removeEventListener('keydown', this.onKeydown)
	}

	on() {
		this.ref_textarea.addEventListener('focus', this.addKeydownEventListener)
		this.ref_textarea.addEventListener('blur', this.removeKeydownEventListener)
	}

	off() {
		this.util.off()
	}
}
