import { CommandIcon, InfoIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'

import { App_About, App_General, App_Shortcuts, Module_Note } from './components'

import type { ElementOf } from 'ts-essentials'

export const app_setting_items = (
	[
		{
			label: 'setting.general.title',
			Icon: SlidersHorizontalIcon,
			key: 'general',
			children: <App_General></App_General>
		},
		{
			label: 'setting.shortcuts.title',
			Icon: CommandIcon,
			key: 'shortcuts',
			children: <App_Shortcuts></App_Shortcuts>
		},
		{
			label: 'setting.about.title',
			Icon: InfoIcon,
			key: 'about',
			children: <App_About></App_About>
		}
	] as const
).slice()

export const module_setting_items = (
	[
		{
			label: 'app.module.note',
			key: 'note',
			children: <Module_Note></Module_Note>
		}
	] as const
).slice()

export type SettingType = ElementOf<typeof app_setting_items>['key'] | ElementOf<typeof module_setting_items>['key']
