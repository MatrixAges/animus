import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://perplexity.ai/',
	api_key: 'https://www.perplexity.ai/settings/api',
	doc: 'https://docs.perplexity.ai/home',
	model_spec: 'https://docs.perplexity.ai/guides/model-cards'
} as Links

export const config = {
	enabled: false,
	api_key: '',
	models: [
		{
			group: 'Sonar',
			items: [
				{
					enabled: true,
					id: 'sonar',
					name: 'Sonar',
					features: {
						web_search: true
					}
				},
				{
					enabled: true,
					id: 'sonar-pro',
					name: 'Sonar Pro',
					features: {
						web_search: true
					}
				},
				{
					enabled: true,
					id: 'sonar-reasoning',
					name: 'Sonar Reasoning',
					features: {
						web_search: true,
						reasoning: true
					}
				},
				{
					enabled: true,
					id: 'sonar-reasoning-pro',
					name: 'Sonar Reasoning Pro',
					features: {
						web_search: true,
						reasoning: true
					}
				},
				{
					enabled: true,
					id: 'sonar-deep-research',
					name: 'Sonar Deep Research',
					features: {
						web_search: true,
						reasoning: true,
						reasoning_optional: true
					}
				}
			]
		}
	]
} as Provider
