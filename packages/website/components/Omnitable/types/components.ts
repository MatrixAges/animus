import type Model from '../model'
import type { Omnitable } from '../types'

export interface IPropsFilter {
	filter_columns: Model['filter_columns']
}

export interface IPropsTable {
	table_columns: Model['table_columns']
	data: Omnitable.List['data']
	editing_info: Model['editing_info']
	sort_params: Model['sort_params']
	setEditingInfo: (v: Model['editing_info']) => void
	onSort: Model['onSort']
	onChange: Model['onChange']
}

export interface IPropsTh {
	column: Model['table_columns'][number]
	sorting_params?: Model['sort_params']
	onSort?: Model['onSort']
}

export interface IPropsRow extends Pick<IPropsTable, 'table_columns' | 'editing_info' | 'setEditingInfo' | 'onChange'> {
	item: Omnitable.List['data'][number]
	index: number
}

export interface IPropsCol {
	column: Model['table_columns'][number]
	value: any
	row_index: number
	focus: boolean | null
	setEditingField?: IPropsTable['setEditingInfo']
}

export interface IPropsComponent {
	column: Model['table_columns'][number]
	value?: any
	row_index: number
	editing: boolean
	onFocus?: (v?: any) => void
	onBlur?: () => void
}

export interface ComponentType extends Pick<IPropsComponent, 'value' | 'editing' | 'onFocus' | 'onBlur'> {
	self_props: any
}

export interface IPropsPagination {}
