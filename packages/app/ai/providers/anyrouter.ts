import type { CustomProvider, Links } from '@/ai'

export const links = {
	website: 'https://anyrouter.top',
	api_key: 'https://anyrouter.top/console/token',
	doc: 'https://anyrouter.top',
	model_spec: 'https://anyrouter.top'
} as Links

export default {
	enabled: false,
	api_key: '',
	api_base_url: 'https://anyrouter.top',
	models: {
		'': [
			{
				enabled: true,
				id: 'claude-3-5-haiku-20241022',
				name: 'Claude 3 Haiku',
				features: {
					function_calling: true,
					structured_output: true,
					web_search: true
				}
			}
		]
	}
} as CustomProvider
