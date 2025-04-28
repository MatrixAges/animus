'use client'

import to from 'await-to-js'
import { omit, uniqBy } from 'lodash-es'
import { makeAutoObservable } from 'mobx'
import mustache from 'mustache'
import { nanoid } from 'nanoid'
import { ofetch } from 'ofetch'
import { setStorageWhenChange } from 'stk/mobx'

import { $ } from '@website/utils'

import type { Omnitable } from './types'
import type { useAppProps } from 'antd/es/app/context'
import type { IReactionDisposer, Lambda } from 'mobx'

export default class Index {
	antd = null as unknown as useAppProps
	primary = 'id'
	props = null as unknown as Omnitable.Props
	config = null as unknown as Omnitable.Config
	filter_columns = [] as Array<Omnitable.FilterColumn & Omnitable.Field>
	table_columns = [] as Array<Omnitable.TableColumn & Omnitable.Field>
	form_columns = [] as Array<Omnitable.FormColumn & Omnitable.Field>
	editing_info = null as null | { row_index: number; field: string; focus: boolean }

	sort_columns = [] as Array<Omnitable.TableColumn & Omnitable.Field>
	sort_field_options = [] as Array<{ label: string; value: any; disabled?: boolean }>
	sort_params = [] as Array<{ field: string; order: 'desc' | 'asc' }>
	filter_relation = 'and' as 'and' | 'or'
	filter_params = [] as Array<{ field: string; expression: string; value: any }>
	visible_columns = [] as Array<{ name: string; id: string; visible: boolean }>
	views = [] as Array<{
		name: string
		sort_params: Index['sort_params']
		filter_relation: Index['filter_relation']
		filter_params: Index['filter_params']
		visible_columns: Index['visible_columns']
	}>
	apply_view_name = ''

	modal_type = 'view' as 'view' | 'edit' | 'add'
	modal_index = null as any
	modal_visible = false
	modal_view_visible = false
	loading_init = true
	loading = false

	items = [] as Array<any>
	pagination = { page: 1, pagesize: 10, total: 0 } as { page: number; pagesize: number; total: number }

	disposers = [] as Array<IReactionDisposer | Lambda>

	constructor() {
		makeAutoObservable(
			this,
			{ antd: false, primary: false, props: false, config: false, disposers: false },
			{ autoBind: true }
		)
	}

	async init(args: { props: Index['props']; antd: Index['antd'] }) {
		const { props, antd } = args

		this.loading_init = true
		this.antd = antd

		if ('config_url' in props) {
			await this.getConfig(props.config_url)
		} else {
			this.config = props
		}

		this.disposers = [setStorageWhenChange([{ [`${this.config.name}:views`]: 'views' }], this)]

		if (this.config.primary) this.primary = this.config.primary

		this.make()
		this.getSortFieldOptions()

		await this.query()

		this.loading_init = false
	}

	async getConfig(config_url: string) {
		const [err, res] = await to<Index['config']>(ofetch(config_url))

		if (err) return this.antd.message.error(`配置请求出错 ${err.message}`)

		this.config = res
	}

	async query() {
		const [err, res] = await to<Omnitable.Error | { data: Omnitable.List }>(
			ofetch(`${this.config.baseurl}${this.config.actions.query}`, {
				method: 'POST',
				body: {
					sort_params: this.sort_params,
					filter_relation: this.filter_relation,
					filter_params: this.filter_params,
					page: this.pagination.page,
					pagesize: this.pagination.pagesize
				}
			})
		)

		if (err) {
			this.antd.message.error(`Query error: ${err?.message}`)

			return false
		}

		if ('error' in res) {
			this.antd.message.error(`${res.error}: ${res.message}`)

			return false
		}

		this.items = this.config.hooks?.afterQuery ? this.config.hooks.afterQuery(res.data.items) : res.data.items
		this.pagination = omit(res.data, 'items')
	}

	async create(v: any) {
		this.loading = true

		const [err, res] = await to<Omnitable.MutationResponse>(
			ofetch(`${this.config.baseurl}${this.config.actions.create}`, {
				method: 'POST',
				body: this.config.hooks?.beforeCreate ? this.config.hooks.beforeCreate(v) : v
			})
		)

		this.loading = false
		this.modal_visible = false

		if (err) {
			this.antd.message.error(`Create error: ${err.message}`)

			return false
		}

		if ('error' in res) {
			this.antd.message.error(`${res.error}: ${res.message}`)

			return false
		}

		this.query()
	}

	async update(primary_value: number | string, v: any) {
		this.loading = true

		const url = mustache.render(`${this.config.baseurl}${this.config.actions.update}`, {
			[this.primary]: primary_value
		})

		const [err, res] = await to<Omnitable.MutationResponse>(
			ofetch(url, {
				method: 'POST',
				body: this.config.hooks?.beforeUpdate ? this.config.hooks.beforeUpdate(v) : v
			})
		)

		this.loading = false
		this.modal_visible = false

		if (err) {
			this.antd.message.error(`Update error: ${err.message}`)

			return false
		}

		if ('error' in res) {
			this.antd.message.error(`${res.error}: ${res.message}`)

			return false
		}

		this.query()
	}

	async delete(primary_value: number | string) {
		const url = mustache.render(`${this.config.baseurl}${this.config.actions.delete}`, {
			[this.primary]: primary_value
		})

		const [err, res] = await to<Omnitable.MutationResponse>(ofetch(url, { method: 'POST' }))

		if (err) {
			this.antd.message.error(`Delete error: ${err.message}`)

			return false
		}

		if ('error' in res) {
			this.antd.message.error(`${res.error}: ${res.message}`)

			return false
		}

		this.query()
	}

	onSubmit(v: any) {
		switch (this.modal_type) {
			case 'add':
				this.create(v)
				break
			case 'edit':
				this.onChange(-1, v)
				break
		}
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
				? uniqBy([...(this.config.form?.columns || []), ...this.config.table.columns], 'name').filter(
						item => !(this.config.form?.exclude_table_columns || []).includes(item.name)
					)
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

			this.form_columns = uniqBy(form_columns, 'name')
		} else {
			this.form_columns =
				this.config.form?.columns?.map(item => {
					const field = this.config.fields.form?.[item.name] || this.config.fields.common[item.name]

					return { ...item, ...field }
				}) || []
		}
	}

	async onChange(index: number, v: any) {
		const operation = v._operation
		const from_modal = index === -1

		if (operation) {
			if (operation.key === 'delete') {
				this.modal_index = index

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
					onOk: async () => {
						const target_item = this.items[index]

						this.items.splice(index, 1)

						const res = await this.delete(target_item[this.primary])

						if (res === undefined) {
							this.modal_index = -2

							return
						}

						console.log('error')
						// 更新出错，重新插入数据
						this.items.splice(index, 0, target_item)
					},
					onCancel: () => {
						this.modal_index = -2
					}
				})
			} else {
				this.modal_type = operation.key
				this.modal_index = index
				this.modal_visible = true
			}
		} else {
			const target_index = from_modal ? this.modal_index : index
			const target_item = this.items[target_index]

			this.items[target_index] = { ...target_item, ...v }

			const res = await this.update(target_item[this.primary], v)

			if (res === undefined) {
				if (from_modal) {
					this.modal_visible = false
					this.modal_index = -2
				}

				return
			}

			// 更新出错，还原数据
			this.items[target_index] = target_item
		}
	}

	getSortFieldOptions(v?: Index['sort_params']) {
		const options = [] as Index['sort_field_options']
		const disabled_options = [] as Index['sort_field_options']
		const sort_params = v || this.sort_params

		this.sort_columns.forEach(item => {
			const target_item = { label: item.name, value: item.bind }

			if (sort_params.find(s => s.field === item.bind)) {
				disabled_options.push({ ...target_item, disabled: true })
			} else {
				options.push(target_item)
			}
		})

		const sort_field_options = [...options, ...disabled_options]

		if (v) return sort_field_options

		this.sort_field_options = sort_field_options
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

		this.clearApplyView()
		this.query()
	}

	onChangeSort(v: Index['sort_params']) {
		this.sort_params = v

		this.getSortFieldOptions()
		this.clearApplyView()
		this.query()
	}

	onChangeFilter(args: { filter_relation?: Index['filter_relation']; filter_params?: Index['filter_params'] }) {
		const { filter_relation, filter_params } = args

		if (filter_relation) this.filter_relation = filter_relation
		if (filter_params) this.filter_params = filter_params

		const target_filter_params = this.filter_params.filter(item => item.value)

		this.clearApplyView()

		if (filter_params?.length && !target_filter_params.length) return

		this.query()
	}

	onAddView() {
		this.views.unshift({
			name: 'Table view ' + nanoid(3),
			sort_params: this.sort_params,
			filter_relation: this.filter_relation,
			filter_params: this.filter_params,
			visible_columns: this.visible_columns
		})

		this.views = $.copy(this.views)
	}

	onApplyView(view: Index['views'][number]) {
		this.apply_view_name = view.name
		this.sort_params = view.sort_params
		this.filter_relation = view.filter_relation
		this.filter_params = view.filter_params
		this.visible_columns = view.visible_columns
		this.modal_view_visible = false

		this.query()
	}

	clearApplyView() {
		this.apply_view_name = ''
	}

	onChangePagination(page: number, pagesize: number) {
		this.pagination = { ...this.pagination, page, pagesize }

		this.query()
	}

	off() {
		this.disposers.map(item => item())
		this.disposers = []
	}
}
