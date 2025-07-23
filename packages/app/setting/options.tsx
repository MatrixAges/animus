import { CommandIcon, InfoIcon, OpenAiLogoIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'

import { About, General, Providers, Shortcuts } from './components/app'
import { Note } from './components/module'

import type { ElementOf } from 'ts-essentials'

export const app_setting_items = (
	[
		{
			label: 'setting.providers.title',
			Icon: OpenAiLogoIcon,
			key: 'providers',
			children: <Providers></Providers>
		},
		{
			label: 'setting.general.title',
			Icon: SlidersHorizontalIcon,
			key: 'general',
			children: <General></General>
		},
		{
			label: 'setting.shortcuts.title',
			Icon: CommandIcon,
			key: 'shortcuts',
			children: <Shortcuts></Shortcuts>
		},
		{
			label: 'setting.about.title',
			Icon: InfoIcon,
			key: 'about',
			children: <About></About>
		}
	] as const
).slice()

export const module_setting_items = (
	[
		{
			label: 'app.module.note',
			key: 'note',
			children: <Note></Note>
		}
	] as const
).slice()

export type SettingType = ElementOf<typeof app_setting_items>['key'] | ElementOf<typeof module_setting_items>['key']
