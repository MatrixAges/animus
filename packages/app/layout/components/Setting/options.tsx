import { CommandIcon, InfoIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'

import { App_About, App_General, App_Shortcuts, Module_Note } from './components'

import type { Icon } from '@phosphor-icons/react'
import type { TFunction } from 'i18next'
import type { JSX } from 'react'

export const getSettingItems = (t: TFunction<'translation', undefined>) => {
	const target = [
		{
			label: t('setting.general.title'),
			Icon: SlidersHorizontalIcon,
			key: 'general',
			children: <App_General></App_General>
		},
		{
			label: t('setting.shortcuts.title'),
			Icon: CommandIcon,
			key: 'shortcuts',
			children: <App_Shortcuts></App_Shortcuts>
		},
		{
			label: t('setting.about.title'),
			Icon: InfoIcon,
			key: 'about',
			children: <App_About></App_About>
		}
	]

	return target.filter(item => item) as Array<{
		label: string
		Icon: Icon
		key: string
		children: JSX.Element
	}>
}

export const getModuleItems = (t: TFunction<'translation', undefined>) => {
	return [
		{
			label: t('app.module.note'),
			key: 'note',
			children: <Module_Note></Module_Note>
		}
	] as const
}
