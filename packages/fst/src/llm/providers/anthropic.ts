import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://anthropic.com/',
	api_key: 'https://console.anthropic.com/settings/keys',
	doc: 'https://docs.anthropic.com/en/docs',
	model_spec: 'https://docs.anthropic.com/en/docs/about-claude/models/overview'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: {
		'': [
			{
				enabled: true,
				id: 'claude-4-opus-20250514',
				name: 'Claude 4 Opus',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true,
					reasoning_optional: true,
					web_search: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'claude-4-sonnet-20250514',
				name: 'Claude 4 Sonnet',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true,
					reasoning_optional: true,
					web_search: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'claude-3-7-sonnet-20250219',
				name: 'Claude 3.7 Sonnet',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true,
					reasoning_optional: true,
					web_search: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'claude-3-5-haiku-20241022',
				name: 'Claude 3.5 Haiku',
				features: {
					function_calling: true,
					structured_output: true,
					web_search: true,
					image_input: true
				}
			}
		]
	}
} as Provider
