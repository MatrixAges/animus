'use client'

import to from 'await-to-js'
import { uniqBy } from 'lodash-es'
import { makeAutoObservable } from 'mobx'
import { ofetch } from 'ofetch'

import { $ } from '@website/utils'

import data from './mock_tasks'

import type { Omnitable } from './types'
import type { useAppProps } from 'antd/es/app/context'

export default class Index {
	antd = null as unknown as useAppProps
	primary = 'id'
	props = null as unknown as Omnitable.Props
	config = null as unknown as Omnitable.Config
	filter_columns = [] as Array<Omnitable.FilterColumn & Omnitable.Field>
	table_columns = [] as Array<Omnitable.TableColumn & Omnitable.Field>
	form_columns = [] as Array<Omnitable.FormColumn & Omnitable.Field>
	editing_info = null as null | { row_index: number; field: string; focus: boolean }
	modal_type = 'view' as 'view' | 'edit'
	modal_index = null as any
	modal_visible = false
	sort_columns = [] as Array<Omnitable.TableColumn & Omnitable.Field>
	sort_field_options = [] as Array<{ label: string; value: any; disabled?: boolean }>
	sort_params = [] as Array<{ field: string; order: 'desc' | 'asc' }>
	filter_relation = 'and' as 'and' | 'or'
	filter_params = [] as Array<{ field: string; expression: string; value: any }>
	visible_columns = [] as Array<{ name: string; id: string; visible: boolean }>
	list = { data, page: 1, pagesize: 10, total: 50 } as null | Omnitable.List

	constructor() {
		makeAutoObservable(this, { antd: false, primary: false, props: false, config: false }, { autoBind: true })
	}

	async init(args: { props: Index['props']; antd: Index['antd'] }) {
		const { props, antd } = args

		this.antd = antd

		if ('config_url' in props) {
			await this.getConfig(props.config_url)
		} else {
			this.config = props
		}

		if (this.config.primary) this.primary = this.config.primary

		this.make()
		this.getSortFieldOptions()
	}

	async getConfig(config_url: string) {
		const [err, res] = await to<Index['config']>(ofetch(config_url))

		if (err) return this.antd.message.error(`配置请求出错 ${err.message}`)

		this.config = res
	}

	make() {
		this.filter_columns = this.config.filter.columns.map(item => {
			const field = this.config.fields.filter?.[item.name] || this.config.fields.common[item.name]

			return { ...item, ...field }
		})

		this.table_columns = this.config.table.columns.map(item => {
			const field = this.config.fields.table?.[item.name] || this.config.fields.common[item.name]
			const column = { ...item, ...field }

			if (item.sort) this.sort_columns.push(column)

			this.visible_columns.push({ name: column.name, id: column.bind, visible: true })

			return column
		})

		if (!this.config.form || this.config.form?.use_table_columns) {
			const target_columns = this.config.form
				? uniqBy([...this.config.form.columns, ...this.config.table.columns], 'name')
				: this.config.table.columns

			const form_columns = target_columns
				.map(item => {
					const field =
						this.config.fields.form?.[item.name] ||
						this.config.fields.common[item.name] ||
						this.config.fields.table?.[item.name]

					if (field.bind === '_operation') return null

					return { ...item, ...field }
				})
				.filter(item => item !== null)

			this.form_columns = uniqBy(form_columns, 'bind')
		} else {
			this.form_columns =
				this.config.form?.columns.map(item => {
					const field = this.config.fields.form?.[item.name] || this.config.fields.common[item.name]

					return { ...item, ...field }
				}) || []
		}
	}

	onChange(index: number, v: any) {
		if (!this.list?.data) return

		const operation = v._operation
		const from_modal = index === -1

		if (operation) {
			if (operation.key === 'delete') {
				this.antd.modal.confirm({
					title: this.config.table.delete_tips?.title || 'Are you absolutely sure?',
					content:
						this.config.table.delete_tips?.content ||
						'This action cannot be undone. This will permanently delete this record.',
					centered: true,
					closable: true,
					icon: null,
					destroyOnClose: true,
					getContainer: () => document.body,
					onOk: () => {
						this.list!.data.splice(index, 1)
					}
				})
			} else {
				this.modal_type = operation.key
				this.modal_index = index
				this.modal_visible = true
			}
		} else {
			const target_index = from_modal ? this.modal_index : index

			this.list.data[target_index] = { ...this.list.data[target_index], ...v }

			if (from_modal) {
				this.modal_visible = false
				this.modal_index = -2
			}
		}
	}

	getSortFieldOptions() {
		const options = [] as Index['sort_field_options']
		const disabled_options = [] as Index['sort_field_options']

		this.sort_columns.forEach(item => {
			const target_item = { label: item.name, value: item.bind }

			if (this.sort_params.find(s => s.field === item.bind)) {
				disabled_options.push({ ...target_item, disabled: true })
			} else {
				options.push(target_item)
			}
		})

		this.sort_field_options = [...options, ...disabled_options]
	}

	onSort(field: string) {
		const exist_sort_index = this.sort_params.findIndex(item => item.field === field)

		if (exist_sort_index === -1) {
			this.sort_params.push({ field, order: 'asc' })
		} else {
			const exist_sort = this.sort_params[exist_sort_index]

			if (exist_sort.order === 'asc') {
				this.sort_params[exist_sort_index].order = 'desc'
			} else {
				this.sort_params.splice(exist_sort_index, 1)
			}
		}

		this.sort_params = $.copy(this.sort_params)
	}

	onChangeSort(v: Index['sort_params']) {
		this.sort_params = v

		this.getSortFieldOptions()
	}

	onChangeFilter(args: { filter_relation?: Index['filter_relation']; filter_params?: Index['filter_params'] }) {
		const { filter_relation, filter_params } = args

		if (filter_relation) this.filter_relation = filter_relation
		if (filter_params) this.filter_params = filter_params
	}

	onChangeVisibleColumns(v: Index['visible_columns']) {
		this.visible_columns = v
	}
}
