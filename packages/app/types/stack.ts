import { Icon, Module } from './app'

export namespace Stack {
	export interface PageItem {
		type: 'page'
		module: Module
	}

	export interface ModuleItem {
		type: 'module'
		module: Module
		name: string
		filename: string
		icon?: Icon
		changed?: boolean
	}

	export type Item = (PageItem | ModuleItem) & {
		id: string
		new?: boolean
		create?: boolean
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

	export interface ModuleProps {
		id: string
		filename: string
		create?: boolean
	}
}
