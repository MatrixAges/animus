import type { Provider } from './schema'

type ModelItem = Provider['models'][number]['items'][number]
type Keys = keyof Required<ModelItem>['features']

export const features_metadata = {
	function_calling: {
		icon: 'wrench',
		color: '#FF5722'
	},
	structured_output: {
		icon: 'brackets-curly',
		color: '#3F51B5'
	},
	reasoning: {
		icon: 'brain',
		color: '#4CAF50'
	},
	reasoning_optional: {
		icon: 'toggle-right',
		color: '#4CAF50'
	},
	web_search: {
		icon: 'google-chrome-logo',
		color: '#00BCD4'
	},
	image_input: {
		icon: 'image-square',
		color: '#E91E63'
	},
	image_output: {
		icon: 'file-image',
		color: '#9C27B0'
	},
	embedding: {
		icon: 'link',
		color: '#009688'
	},
	reranking: {
		icon: 'text-align-lef',
		color: '#FF9800'
	}
} as Record<Keys, { icon: string; color: string }>
