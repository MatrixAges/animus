import type { App, Layout, Setting, Stack } from '@/models'
import type { Module, ViodFn } from '@/types'

export interface IPropsSidebar {
	toggleSetting: ViodFn
	closeSidebar: ViodFn
}

export interface IPropsSidebarHeader extends Pick<IPropsSidebar, 'toggleSetting' | 'closeSidebar'> {}

export interface IPropsEmpty {
	sidebar_fold: Layout['sidebar_fold']
	showSidebar: ViodFn
	toggleSetting: ViodFn
}

export interface IPropsStacks {
	columns: Stack['columns']
	focus: Stack['focus']
	container_width: Stack['container_width']
	resizing: Stack['resizing']
	click: Stack['click']
	remove: Stack['remove']
	update: Stack['update']
	move: Stack['move']
	resize: Stack['resize']
	setResizing: (v: boolean) => boolean
	observe: Stack['observe']
	unobserve: Stack['unobserve']
	showSidebar: ViodFn
}

export interface IPropsSetting {
	update_status: App['update_status']
	visible: Setting['visible']
	active: Setting['active']
	visible_menu: Setting['visible_menu']
	onClose: () => void
	onMenuItem: (key: string) => void
	toggleMenu: ViodFn
}

export interface IPropsStacks {
	columns: Stack['columns']
	focus: Stack['focus']
	container_width: Stack['container_width']
	resizing: Stack['resizing']
	click: Stack['click']
	remove: Stack['remove']
	update: Stack['update']
	move: Stack['move']
	resize: Stack['resize']
	setResizing: (v: boolean) => boolean
	observe: Stack['observe']
	unobserve: Stack['unobserve']
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
