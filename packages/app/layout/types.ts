import type { GlobalModel } from '@/context'
import type { Setting } from '@/models'

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
	update_status: Setting['update_status']
	visible: Setting['visible']
	active: Setting['active']
	visible_menu: Setting['visible_menu']
	onClose: () => void
	onMenuItem: (key: string) => void
	toggleMenu: () => void
}
