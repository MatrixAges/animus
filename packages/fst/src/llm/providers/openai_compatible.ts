import type { CustomProvider, Links } from '@fst/llm'

export const links = {
	website: '',
	api_key: '',
	doc: '',
	model_spec: ''
} as Links

export default {
	enabled: false,
	api_key: '',
	api_base_url: '',
	models: []
} as CustomProvider
