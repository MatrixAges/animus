import type { GlobalModel } from '@/context'
import type { App, Setting } from '@/models'
import type { Module } from '@/types'

export interface IPropsStacks {
	columns: GlobalModel['stack']['columns']
	focus: GlobalModel['stack']['focus']
	container_width: GlobalModel['stack']['container_width']
	resizing: GlobalModel['stack']['resizing']
	click: GlobalModel['stack']['click']
	remove: GlobalModel['stack']['remove']
	update: GlobalModel['stack']['update']
	move: GlobalModel['stack']['move']
	resize: GlobalModel['stack']['resize']
	setResizing: (v: boolean) => boolean
	observe: GlobalModel['stack']['observe']
	unobserve: GlobalModel['stack']['unobserve']
}

export interface IPropsSetting {
	update_status: App['update_status']
	visible: Setting['visible']
	active: Setting['active']
	visible_menu: Setting['visible_menu']
	onClose: () => void
	onMenuItem: (key: string) => void
	toggleMenu: () => void
}

export interface IPropsStacks {
	columns: GlobalModel['stack']['columns']
	focus: GlobalModel['stack']['focus']
	container_width: GlobalModel['stack']['container_width']
	resizing: GlobalModel['stack']['resizing']
	click: GlobalModel['stack']['click']
	remove: GlobalModel['stack']['remove']
	update: GlobalModel['stack']['update']
	move: GlobalModel['stack']['move']
	resize: GlobalModel['stack']['resize']
	setResizing: (v: boolean) => boolean
	observe: GlobalModel['stack']['observe']
	unobserve: GlobalModel['stack']['unobserve']
}

export interface IPropsStacksNavBar
	extends Omit<
		IPropsStacks,
		| 'visible'
		| 'current_module'
		| 'container_width'
		| 'move'
		| 'resize'
		| 'setResizing'
		| 'observe'
		| 'unobserve'
		| 'showSetting'
	> {
	resizing: boolean
}

export interface IPropsStacksNavBarColumn extends Omit<IPropsStacksNavBar, 'columns' | 'move'> {
	column_index: number
	column_is_last?: boolean
	column: IPropsStacksNavBar['columns'][number]
}

export interface IPropsStacksNavBarView
	extends Omit<IPropsStacksNavBarColumn, 'column' | 'move' | 'resizing' | 'showHomeDrawer'> {
	view_index: number
	view: IPropsStacksNavBar['columns'][number]['views'][number]
	drag_overlay?: boolean
}

export interface IPropsStacksContent
	extends Pick<IPropsStacks, 'columns' | 'container_width' | 'click' | 'resize' | 'setResizing'> {
	resizing: boolean
}

export interface IPropsStacksContentDrop {
	column_index: number
	direction: 'left' | 'right'
}

export interface IPropsStacksContentColumn {
	column_index: number
	column: IPropsStacksNavBar['columns'][number]
	width: number
	container_width: IPropsStacksContent['container_width']
	resizing: IPropsStacksContent['resizing']
	click: IPropsStacksContent['click']
	resize: IPropsStacksContent['resize']
	setResizing: IPropsStacksContent['setResizing']
}

export interface IPropsStacksContentView {
	column_index: number
	view_index: number
	view: IPropsStacksNavBar['columns'][number]['views'][number]
	width: number
	container_width: IPropsStacksContent['container_width']
	click: IPropsStacksContent['click']
}

export interface IPropsStacksView {
	column_index: number
	view_index: number
	module: Module
	id: string
	width: number
	container_width: IPropsStacksContent['container_width']
	click: IPropsStacksContent['click']
}
