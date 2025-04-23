export * from './components'

export namespace Omnitable {
	export interface Config {
		// 支持mustache语法 /delete/{{id}} => /delete/3
		actions: {
			baseurl: string
			// POST
			create?: string
			// POST
			delete?: string
			// POST
			update?: string
			// GET
			query: string
		}
		filter: {
			flat?: boolean
			columns: Array<BaseColumn>
		}
		table: {
			props?: TableProps
			columns: Array<TableColumn>
		}
		fields: {
			// filter和table可覆盖common中定义的字段
			common: Fields
			filter: Fields
			table: Fields
		}
	}

	export interface TableProps {}

	export interface BaseColumn {
		name: string
		width?: number
	}

	export interface TableColumn extends BaseColumn {
		sort?: boolean
		readonly?: boolean
	}

	export interface Fields {
		[key: string]: Field
	}

	export type Field = { bind: string } & FieldComponent

	export type FieldComponent = Text | Input | InputNumber | Select | Date | DatePicker | Priority | StatusIndicator

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
		props?: {
			placeholder?: string
		}
	}

	export type InputNumber = {
		type: 'input_number'
		props?: {
			placeholder?: string
		}
	}

	export type Select = {
		type: 'select'
		props: {
			placeholder?: string
			options: Array<{ label: string; value: string | number | boolean } | string>
		}
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

	export type StatusIndicator = {
		type: 'status_indicator'
		props?: {}
	}

	export interface List {
		data: Array<any>
		page: number
		pagesize: number
		total: number
	}
}
