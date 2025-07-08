import { flat } from '@/utils'

export const config_keys = flat({
	lang: '',
	theme_source: '',
	glass: '',
	sidebar_fold: '',
	chat: {
		config: {
			prompt_rewriting: '',
			newline_by_enter: '',
			web_search: {
				enabled: '',
				engine: ''
			}
		},
		setting: {
			temperature: '',
			top_p: '',
			max_ouput_tokens: ''
		},
		select_model: ''
	}
})

export const path = {
	app: 'app.json',
	setting: 'setting.json'
}
