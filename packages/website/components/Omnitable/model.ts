'use client'

import { makeAutoObservable } from 'mobx'

import data from './mock_tasks'

import type { Omnitable } from './types'

export default class Index {
	primary = 'id'
	config = null as unknown as Omnitable.Config
	filter_columns = [] as Array<Omnitable.BaseColumn & Omnitable.Field>
	table_columns = [] as Array<Omnitable.TableColumn & Omnitable.Field>
	sort_params = null as null | { field: string; order: 'desc' | 'asc' | null }
	editing_info = null as null | { row_index: number; field: string; focus: boolean }
	list = { data, page: 1, pagesize: 10, total: 50 } as null | Omnitable.List

	constructor() {
		makeAutoObservable(this, { primary: false, config: false }, { autoBind: true })
	}

	init(config: Index['config']) {
		if (config.primary) this.primary = config.primary

		this.config = config

		this.make()
	}

	make() {
		this.filter_columns = this.config.filter.columns.map(item => {
			const field = this.config.fields.filter[item.name] || this.config.fields.common[item.name]

			return { ...item, ...field }
		})

		this.table_columns = this.config.table.columns.map(item => {
			const field = this.config.fields.table[item.name] || this.config.fields.common[item.name]

			return { ...item, ...field }
		})
	}

	onChange(index: number, v: any) {
		this.list!.data[index] = { ...this.list?.data[index], ...v }
	}

	onSort(field: string) {}
}
