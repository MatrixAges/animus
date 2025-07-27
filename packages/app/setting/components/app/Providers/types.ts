import type { Provider as ProviderModel } from '@/models'
import type { Links, Model, Provider, ProviderKey } from 'fst/llm'
import type { JSONSchema7 } from 'json-schema'

export interface IPropsForm {
	id: ProviderKey
	name: string
	schema: JSONSchema7
	links: Links
	config: Provider
	setProvider: ProviderModel['setProvider']
	onEditProvider: (name: string) => void
	removeProvider: (name: string) => void
}

export interface IPropsFormGroupItem {
	group: Provider['models'][number]
	group_index: number
	removeGroup: (index: number | number[]) => void
}

export interface IPropsFormModelForm {
	item: Model
	group_index: number
	model_index: number
	onRemove: () => void
	getFieldValue: (name: any) => any
	setFieldValue: (name: any, value: any) => void
	onClose: () => void
}

export interface IPropsFormFeatures {
	value?: Model['features']
	onChange?: (v: IPropsFormFeatures['value']) => void
}

export interface IPropsFormModelItem {
	item: Model
	group_index: number
	model_index: number
	remove: (index: number | number[]) => void
}

export interface IPropsMutateProviderForm {
	mutate_provider_item: ProviderModel['mutate_provider_item']
	mutateProvider: ProviderModel['mutateProvider']
}
