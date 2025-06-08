import type { Rectangle } from 'electron'

export namespace App {
	export interface PaidInfo {
		paid_plan: string
		paid_expire: number
		verify_at: number
	}

	export type Lang = 'en' | 'zh'

	export interface Widget {
		show: boolean
		title?: string
		bounds: Rectangle
	}
}
