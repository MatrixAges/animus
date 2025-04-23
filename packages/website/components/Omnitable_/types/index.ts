import type { IProps } from './components'

export namespace Omnitable {
	export interface Config {
		filter: {
			columns: Array<BaseColumn>
			actions?: Array<{ type: 'create' }>
		}
		table: {
			props?: IProps
			columns: Array<TableColumn>
		}
		fields: {
			filter: Fields
			table: Fields
		}
		apis: {
			create: string
			delete: string
			update: string
			query: string
		}
	}

	export interface BaseColumn {
		name: string
		width?: number
	}

	export interface TableColumn extends BaseColumn {
		fixed?: boolean
	}

	export interface Fields {
		[key: string]: Field
	}

	export interface Field {
		id: string
		bind: string
		view: ViewComponent
		edit?: EditComponent
	}

	export interface Component {
		bind?: string
	}

	export interface Response {
		data: Array<any>
		page: number
		pagesize: number
		total: number
	}
}
