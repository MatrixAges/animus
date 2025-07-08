import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { Util } from '@/models'
import { store_options as default_store_options } from '@/utils'
import { setStoreWhenChange } from 'stk/mobx'
import { config_keys } from '@/appdata'

import type { IProps } from './types'

@injectable()
export default class Index {
	prompt_rewriting = false
	newline_by_enter = false
	web_search_enabled = false
	web_search_engine = ''
	temperature = 0.9
	top_p = 0.9
	max_ouput_tokens = 0
	select_model = [] as Array<string>

	ref_textarea = null as unknown as HTMLTextAreaElement

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false, ref_textarea: false }, { autoBind: true })
	}

	async init(args: { store_options?: IProps['store_options'] }) {
		const { store_options } = args

		const off = await setStoreWhenChange(
			[
				{ [config_keys['chat.config.prompt_rewriting']]: 'prompt_rewriting' },
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

	submit() {
		const value = this.ref_textarea.value

		console.log(value)
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
