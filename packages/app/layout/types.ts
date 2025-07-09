import type { App, Layout, Setting, Stack } from '@/models'
import type { Module, Stack as StackType, ViodFn } from '@/types'

export interface IPropsSidebar {
	favorite_items: App['favorite_items']
	recent_items: App['recent_items']
	toggleSetting: ViodFn
	closeSidebar: ViodFn
	addPage: (v: Module) => void
}

export interface IPropsSidebarHeader extends Pick<IPropsSidebar, 'toggleSetting' | 'closeSidebar'> {}

export interface IPropsSidebarModules extends Pick<IPropsSidebar, 'addPage'> {}

export interface IPropsSidebarList {
	title: string
	items: Array<StackType.Item>
}

export interface IPropsEmpty {
	sidebar_fold: Layout['sidebar_fold']
	showSidebar: ViodFn
	toggleSetting: ViodFn
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
	sidebar_fold: Layout['sidebar_fold']
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
	> {
	resizing: boolean
}

export interface IPropsStacksNavBarColumn extends Omit<IPropsStacksNavBar, 'columns' | 'move'> {
	column_index: number
	column_is_last?: boolean
	column: IPropsStacksNavBar['columns'][number]
}

export interface IPropsStacksNavBarView
	extends Omit<IPropsStacksNavBarColumn, 'sidebar_fold' | 'column' | 'move' | 'resizing' | 'showHomeDrawer'> {
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
	type: StackType.Item['type']
	module: Module
	id: string
	filename: string
	width: number
	container_width: IPropsStacksContent['container_width']
	create?: boolean
	click: IPropsStacksContent['click']
}
