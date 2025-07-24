import type { Provider } from './schema'

export interface Links {
	website: string
	api_key: string
	doc: string
	model_spec: string
}

export type Model = Provider['models'][number]['items'][number]
export type FeaturesKey = keyof Required<Model>['features']
