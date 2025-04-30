import type { InputProps, InputNumberProps } from 'antd'
import type { TextAreaProps } from 'antd/es/input'
import type { ReactNode } from 'react'

export * from './components'

export namespace Omnitable {
	export type Props = LowCodeConfig | Config

	export interface LowCodeConfig {
		config_url: string
	}

	export interface Config {
		// 表名称，用于本地存储的前缀（请保持唯一）
		name: string
		// 主键，默认为 'id'
		primary?: string
		// 支持mustache语法 /delete/{{id}} => /delete/3
		baseurl: string
		actions: {
			// POST
			query: string
			// POST
			create?: string
			// POST
			update?: string
			// POST
			delete?: string
		}
		hooks?: {
			// 处理数据查询到的数据
			afterQuery?: (v: any) => any
			// 处理要创建的数据
			beforeCreate?: (v: any) => any
			// 处理要变更的数据
			beforeUpdate?: (v: any) => any
		}
		filter: {
			columns: Array<FilterColumn>
			props?: {}
			flat?: boolean
		}
		table: {
			columns: Array<TableColumn>
			props?: {
				// 预置的pagesize
				pagesize?: number
			}
			delete_tips?: { title?: string; content?: string }
		}
		// 开启数据分组，支持多层级，
		group?: {
			// 表示顺序层级，如：'Period > Farm > Pool'
			order?: string
			// 指定在生成group时，哪些字段的值进行累加
			acc?: Array<string>
			// 隐藏
			hide?: boolean
		}
		// 可选 form，如果不写就使用 table 的 columns 配置
		form?: {
			// columns中 的字段会覆盖 bind 相同的 table_columns 中的字段
			columns?: Array<FormColumn>
			props?: {}
			// 在table_columns的基础上扩展
			use_table_columns?: boolean
			exclude_table_columns?: Array<string>
		}
		fields: {
			// filter和table可覆盖common中定义的字段
			common: Fields
			filter?: Fields
			table?: Fields
			form?: Fields
		}
	}

	export interface BaseColumn {
		name: string
		width?: number
		// form 24栅格，span表示跨度
		span?: number
	}

	export interface FilterColumn extends BaseColumn {
		datatype: 'string' | 'number' | 'date' | 'array'
	}

	export interface TableColumn extends BaseColumn {
		sort?: boolean
		readonly?: boolean
		sticky?: boolean
		stat?: boolean
		group?: boolean
	}

	export interface FormColumn extends BaseColumn {
		readonly?: boolean
	}

	export interface Fields {
		[key: string]: Field
	}

	export type Field = { bind: string } & FieldComponent

	export type FieldComponent =
		| Text
		| Input
		| InputNumber
		| Textarea
		| Select
		| Date
		| DatePicker
		| Priority
		| HttpCode
		| HttpCodeIndicator
		| Operation

	export type Text = {
		type: 'text'
		props?: {
			// 开启format的情况下，会传入整个item作为参数
			format?: string
			// "({{value}})"
			textwrap?: string
			// 使用了上面其中一种格式化后prefix和suffix会失效
			prefix?: string
			suffix?: string
		}
	}

	export type Input = {
		type: 'input'
		props?: InputProps
	}

	export type InputNumber = {
		type: 'input_number'
		props?: InputNumberProps
	}

	export type Textarea = {
		type: 'textarea'
		props?: TextAreaProps
	}

	export type Select = {
		type: 'select'
		props: {
			options?: Array<SelectOption>
			// 如果设置remote，则忽略options，使用remote请求options
			remote?: {
				// 如果未设置search，则使用api获取options
				api: string
				// 开启关键词搜索options，值为查询key名称
				search?: string
				// 附带的请求参数
				query?: Record<string, any>
			}
			mode?: 'multiple' | 'tags'
			placeholder?: string
			borderless?: boolean
		}
	}

	export interface SelectOption {
		label: ReactNode
		value: string | number | boolean
		icon?: string
	}

	export type Date = {
		type: 'date'
		props?: {
			format?: string
		}
	}

	export type DatePicker = {
		type: 'date_picker'
		props?: {
			format?: string
		}
	}

	export type Priority = {
		type: 'priority'
		props?: {}
	}

	export type HttpCode = {
		type: 'http_code'
		props?: {}
	}

	export type HttpCodeIndicator = {
		type: 'http_code_indicator'
		props?: {}
	}

	export type Operation = {
		type: 'operation'
		props?: {
			no_edit?: boolean
			no_delete?: boolean
		}
	}

	export interface Error {
		error: string
		message: string
	}

	export type MutationResponse = Error | { id: number }

	export interface List {
		items: Array<any>
		page: number
		pagesize: number
		total: number
	}
}
