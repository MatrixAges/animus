'use client'

import { uniqBy } from 'lodash-es'
import { makeAutoObservable, toJS } from 'mobx'

import data from './mock_tasks'

import type { Omnitable } from './types'
import type { useAppProps } from 'antd/es/app/context'

export default class Index {
	antd = null as unknown as useAppProps
	primary = 'id'
	config = null as unknown as Omnitable.Config
	filter_columns = [] as Array<Omnitable.BaseColumn & Omnitable.Field>
	table_columns = [] as Array<Omnitable.TableColumn & Omnitable.Field>
	form_columns = [] as Array<Omnitable.FormColumn & Omnitable.Field>
	sort_params = null as null | { field: string; order: 'desc' | 'asc' | null }
	editing_info = null as null | { row_index: number; field: string; focus: boolean }
	list = { data, page: 1, pagesize: 10, total: 50 } as null | Omnitable.List
	modal_type = 'view' as 'view' | 'edit'
	modal_index = null as any
	modal_visible = false

	constructor() {
		makeAutoObservable(this, { antd: false, primary: false, config: false }, { autoBind: true })
	}

	init(args: { config: Index['config']; antd: Index['antd'] }) {
		const { config, antd } = args

		this.antd = antd
		this.config = config

		if (config.primary) this.primary = config.primary

		this.make()
	}

	make() {
		this.filter_columns = this.config.filter.columns.map(item => {
			const field = this.config.fields.filter?.[item.name] || this.config.fields.common[item.name]

			return { ...item, ...field }
		})

		this.table_columns = this.config.table.columns.map(item => {
			const field = this.config.fields.table?.[item.name] || this.config.fields.common[item.name]

			return { ...item, ...field }
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

	onSort(field: string) {}
}
