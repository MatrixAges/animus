import { useMemo } from 'react'

import {
	BookmarksIcon,
	BooksIcon,
	BroadcastIcon,
	ChatIcon,
	CowboyHatIcon,
	CubeTransparentIcon,
	DatabaseIcon,
	FeatherIcon,
	TreeStructureIcon
} from '@phosphor-icons/react'

import type { Module } from '@/types'
import type { Icon, IconProps } from '@phosphor-icons/react'

const module_icon = {
	note: FeatherIcon,
	chat: ChatIcon,
	research: CubeTransparentIcon,
	linkcase: BookmarksIcon,
	database: DatabaseIcon,
	agent: CowboyHatIcon,
	flow: TreeStructureIcon,
	library: BooksIcon
} as Record<Module, Icon>

interface IProps extends IconProps {
	module: Module
}

const Index = ({ module, ...props }: IProps) => {
	const Icon = useMemo(() => module_icon[module], [module])

	return <Icon {...props}></Icon>
}

export default $app.memo(Index)
