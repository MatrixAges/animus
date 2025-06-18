export type Theme = 'light' | 'dark' | 'system'
export type Lang = 'en' | 'zh-cn'
export type Module = 'note' | 'card' | 'chat' | 'flow' | 'database' | 'linkcase' | 'library'

export interface File {
	module: Module
	icon: string
	name: string
	id: string
	dirty?: boolean
	[key: string]: any
}

export interface HasUpdate {
	type: 'has_update'
	version: string
}

export interface Downloading {
	type: 'downloading'
	percent: number
}

export type UpdateState = null | HasUpdate | Downloading | { type: 'downloaded' }

export type EventPath = 'app.openSearch' | 'app.closeSearch'

export interface Shortcut {
	key_bindings: string | { darwin: string; win32: string }
	event_path: EventPath
	readonly: boolean
	special_key?: string
	options?: {
		keyup?: boolean | null
		keydown?: boolean | null
	}
}
