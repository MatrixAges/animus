import { modules } from '@/appdata'
import icons from '@/icons/en/icons'

import type { ElementOf } from 'ts-essentials'

export type Theme = 'light' | 'dark' | 'system'
export type ThemeValue = Exclude<Theme, 'system'>
export type Lang = 'en' | 'zh-cn'
export type Module = ElementOf<typeof modules>
export type Icon = keyof typeof icons | (string & {})

export interface HasUpdate {
	type: 'has_update'
	version: string
}

export interface Downloading {
	type: 'downloading'
	percent: number
}

export interface UpdateError {
	type: 'error'
	message: string
}

export type UpdateState = null | HasUpdate | Downloading | UpdateError | { type: 'downloaded' }

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

export type IconType = 'icon' | 'emoji'

export interface IconProps {
	icon: string
	icon_type: IconType
}

export interface Workspace extends IconProps {
	name: string
}
