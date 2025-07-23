import type { CustomProvider, Links } from '@fst/llm'

export const links = {
	website: 'https://lmstudio.ai',
	api_key: '',
	doc: 'https://lmstudio.ai/docs/app',
	model_spec: 'https://lmstudio.ai/models'
} as Links

export default {
	enabled: false,
	api_key: '',
	api_base_url: 'http://localhost:1234/v1',
	models: []
} as CustomProvider
