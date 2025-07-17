import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models/common'
import { store_options as default_store_options } from '@/utils'
import { setStoreWhenChange } from 'stk/mobx'
import { config_keys } from '@/appdata'
import { id } from 'stk/common'
import { GlobalModel } from '@/context'
import Decimal from 'decimal.js'
import { ipc } from '@/utils'

import type { IProps } from './types'
import type { Stack, Chat, ListItem } from '@/types'

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
	select_model = [] as Array<string>

	ref_textarea = null as unknown as HTMLTextAreaElement

	constructor(
		public util: Util,
		public global: GlobalModel
	) {
		makeAutoObservable(this, { util: false, global: false, ref_textarea: false }, { autoBind: true })
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
			store_options ?? default_store_options
		)

		this.util.acts = [off]

		this.on()
	}

	async submit() {
		const value = this.ref_textarea.value

		if (!value) return
		if (!this.select_model.length) return

		const name = value.replace(/[\r\n]+/g, '').slice(0, 12)
		const stack = this.global.stack
		const stack_item = { type: 'module', module: 'chat', name } as Stack.Item

		const options = {
			system_prompt: this.system_prompt,
			prompt_rewriting: this.prompt_rewriting,
			newline_by_enter: this.newline_by_enter,
			web_search_enabled: this.web_search_enabled,
			web_search_engine: this.web_search_engine,
			temperature: this.temperature,
			top_p: this.top_p,
			max_ouput_tokens: this.max_ouput_tokens,
			question: value,
			name
		} as Chat.Options

		if (this.select_model.length === 1) {
			const chat_id = id()
			const model = this.select_model[0]
			const filename = `${name}(${model}).${chat_id}`
			const target_options = { ...options, model }
			const target_item = { module: 'chat', id: filename, name, icon: '', icon_type: 'icon' } as ListItem

			stack.setTemp(chat_id, target_options)
			stack.add({ ...stack_item, id: chat_id, filename })

			ipc.app.write.mutate({ module: 'chat', filename, data: { options: target_options } })
			ipc.app.list.add.mutate({ module: 'chat', filename: 'list', items: [target_item] })
			ipc.app.recent.add.mutate({ module: 'chat', items: [target_item] })
		} else {
			const width = new Decimal(Decimal.div(100, this.select_model.length).toFixed(2)).toNumber()
			const list_items = [] as Array<ListItem>

			this.select_model.forEach((item, index) => {
				const chat_id = id()
				const view = { ...stack_item, id: chat_id, active: true }
				const filename = `${name}(${item}).${chat_id}`
				const target_options = { ...options, model: item }

				const target_item = {
					module: 'chat',
					id: filename,
					name,
					icon: '',
					icon_type: 'icon'
				} as ListItem

				stack.setTemp(chat_id, target_options)

				list_items.push(target_item)

				if (stack.columns[index]) {
					const views = stack.columns[index].views

					stack.columns[index].width = width

					views.forEach(view => (view.active = false))
					views.push(view)
				} else {
					stack.columns[index] = {
						views: [view],
						width
					} as Stack.Column
				}

				ipc.app.write.mutate({ module: 'chat', filename, data: { options: target_options } })
			})

			stack.columns = $copy(stack.columns)

			ipc.app.list.add.mutate({ module: 'chat', filename: 'list', items: list_items })
			ipc.app.recent.add.mutate({ module: 'chat', items: list_items })
		}
	}

	onKeydown(e: KeyboardEvent) {
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
