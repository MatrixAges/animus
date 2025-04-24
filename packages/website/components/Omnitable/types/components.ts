import type Model from '../model'
import type { Omnitable } from '../types'

export interface IPropsSort {
	sort_field_options: Model['sort_field_options']
	sort_params: Model['sort_params']
	onChangeSort: Model['onChangeSort']
}

export interface IPropsSortItem {
	sort_field_options: Model['sort_field_options']
	remove: (index: number | number[]) => void
}

export interface IPropsFilter {
	filter_columns: Model['filter_columns']
	filter_relation: Model['filter_relation']
	filter_params: Model['filter_params']
	onChangeFilter: Model['onChangeFilter']
}

export interface IPropsFilterItem {
	filter_field_options: Array<{ label: string; value: any }>
	filter_columns: Model['filter_columns']
	filter_param: Model['filter_params'][number]
	remove: (index: number | number[]) => void
}

export interface IPropsTable {
	primary: Model['primary']
	table_columns: Model['table_columns']
	data: Omnitable.List['data']
	editing_info: Model['editing_info']
	sort_params: Model['sort_params']
	modal_index: Model['modal_index']
	setEditingInfo: (v: Model['editing_info']) => void
	onSort: Model['onSort']
	onChange: Model['onChange']
}

export interface IPropsTh {
	column: Model['table_columns'][number]
	order?: Model['sort_params'][number]['order']
	onSort?: Model['onSort']
}

export interface IPropsRow
	extends Pick<IPropsTable, 'table_columns' | 'editing_info' | 'modal_index' | 'setEditingInfo' | 'onChange'> {
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
	onChange?: (v: any) => void
}

export interface IPropsFormComponent {
	column: Model['table_columns'][number]
	disabled?: boolean
	value?: any
	use_by_filter?: boolean
	onChange?: (v: any) => void
}

export interface ComponentType<T = {}>
	extends Pick<IPropsComponent, 'value' | 'editing' | 'onFocus' | 'onBlur' | 'onChange'> {
	width?: number
	disabled?: boolean
	use_by_form?: boolean
	use_by_filter?: boolean
	self_props: T
}

export interface IPropsPagination {}

export interface IPropsDetail {
	form_columns: Model['form_columns']
	modal_type: Model['modal_type']
	item: any
	onChange: Model['onChange']
	onClose: () => void
}
