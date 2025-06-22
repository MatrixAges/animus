import { Icon, Module } from './app'

export namespace Stack {
	export interface PageItem {
		type: 'page'
		module: Module
	}

	export interface ModuleItem {
		type: 'module'
		module: Module
		icon: Icon
		name: string
		changed?: boolean
	}

	export type Item = (PageItem | ModuleItem) & {
		id: string
		active?: boolean
		[key: string]: any
	}

	export interface Column {
		views: Array<Item>
		width: number
	}

	export type Columns = Array<Column>

	export interface Position {
		column: number
		view: number
	}
}
