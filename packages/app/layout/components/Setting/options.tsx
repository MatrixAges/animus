import { CommandIcon, InfoIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'

import { About, General, Shortcuts } from './app'
import { Note } from './modules'

import type { Icon } from '@phosphor-icons/react'
import type { TFunction } from 'i18next'
import type { JSX } from 'react'

export const getSettingItems = (t: TFunction<'translation', undefined>) => {
	const target = [
		{
			label: t('setting.general.title'),
			Icon: SlidersHorizontalIcon,
			key: 'general',
			children: <General></General>
		},
		{
			label: t('setting.shortcuts.title'),
			Icon: CommandIcon,
			key: 'shortcuts',
			children: <Shortcuts></Shortcuts>
		},
		{
			label: t('setting.about.title'),
			Icon: InfoIcon,
			key: 'about',
			children: <About></About>
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
			children: <Note></Note>
		}
	] as const
}
