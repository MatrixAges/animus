import type { Links, OllamaProvider } from '@fst/llm'

export const links = {
	website: 'hhttps://ollama.com',
	api_key: '',
	doc: 'https://github.com/ollama/ollama/tree/main/docs',
	model_spec: 'https://ollama.com/search'
} as Links

export default {
	enabled: false,
	api_base_url: 'http://localhost:11434/api',
	models: {}
} as OllamaProvider
