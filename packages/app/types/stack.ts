import { Icon, IconType, Module } from './app'

export namespace Stack {
	export interface PageItem {
		type: 'page'
		module: Module
	}

	export interface ModuleItem {
		type: 'module'
		module: Module
		name: string
		icon?: Icon
		icon_type?: IconType
	}

	export type Item = (PageItem | ModuleItem) & {
		id: string
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
	}
}
