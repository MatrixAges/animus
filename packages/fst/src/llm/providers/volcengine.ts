import type { CustomProvider, Links } from '@fst/llm'

export const links = {
	website: 'https://console.volcengine.com/ark/',
	api_key: 'https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey',
	doc: 'https://www.volcengine.com/docs/82379/1182403',
	model_spec: 'https://console.volcengine.com/ark/region:ark+cn-beijing/model'
} as Links

export const config = {
	enabled: false,
	api_key: '',
	api_base_url: 'https://ark.cn-beijing.volces.com/api/v3/',
	models: []
} as CustomProvider
