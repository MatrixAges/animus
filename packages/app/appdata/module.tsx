import { useMemo } from 'react'

import { FeatherIcon } from '@phosphor-icons/react'

import type { Module } from '@/types'
import type { Icon, IconProps } from '@phosphor-icons/react'

export const module_icon = {
	note: FeatherIcon
} as Record<Module, Icon>

interface IProps extends IconProps {
	module: Module
}

export const ModuleIcon = $app.memo(({ module, ...props }: IProps) => {
	const Icon = useMemo(() => module_icon[module], [module])

	return <Icon {...props}></Icon>
})
