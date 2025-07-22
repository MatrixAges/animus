import type { Links, OpenaiCompatibleProvider } from '@fst/llm'

export const links = {
	website: '',
	api_key: '',
	doc: '',
	model_spec: ''
} as Links

export default {
	enabled: false,
	name: '',
	api_key: '',
	api_base_url: '',
	models: {}
} as OpenaiCompatibleProvider
