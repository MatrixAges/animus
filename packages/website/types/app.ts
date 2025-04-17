import { locales } from '@website/appdata'

export namespace App {
	export type Theme = 'light' | 'dark'
	export type Locales = (typeof locales)[number]
}
