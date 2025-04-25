import type { InputProps, InputNumberProps } from 'antd'
import type { TextAreaProps } from 'antd/es/input'

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
		actions: {
			baseurl: string
			// POST
			query: string
			// POST
			create?: string
			// POST
			update?: string
			// POST
			delete?: string
		}
		filter: {
			columns: Array<FilterColumn>
			props?: {}
			flat?: boolean
		}
		table: {
			columns: Array<TableColumn>
			props?: {}
			delete_tips?: { title?: string; content?: string }
		}
		// 可选 form，如果不写就使用 table 的 columns 配置
		form?: {
			// columns中 的字段会覆盖 bind 相同的 table_columns 中的字段
			columns: Array<FormColumn>
			props?: {}
			// 在table_columns的基础上扩展
			use_table_columns?: boolean
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
		| Status
		| HttpCode
		| HttpCodeIndicator
		| Operation

	export type Text = {
		type: 'text'
		props?: {
			format?: string
			prefix?: string | { text: string; light_color: boolean }
			suffix?: string | { text: string; light_color: boolean }
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
			placeholder?: string
			options: Array<SelectOption | string>
		}
	}

	export interface SelectOption {
		label: string
		value: string | number | boolean
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

	export type Status = {
		type: 'status'
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
		props?: {}
	}

	export interface List {
		data: Array<any>
		page: number
		pagesize: number
		total: number
	}
}
