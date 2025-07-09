import { useMemo } from 'react'

import {
	BookmarksIcon,
	ChatIcon,
	CirclesThreePlusIcon,
	CowboyHatIcon,
	CubeTransparentIcon,
	DatabaseIcon,
	FeatherIcon,
	GraphIcon,
	TreeStructureIcon
} from '@phosphor-icons/react'

import type { Module } from '@/types'
import type { Icon, IconProps } from '@phosphor-icons/react'

export const module_icon = {
	chat: ChatIcon,
	research: CubeTransparentIcon,
	agent: CowboyHatIcon,
	flow: TreeStructureIcon,
	linkcase: BookmarksIcon,
	memory: GraphIcon,
	note: FeatherIcon,
	database: DatabaseIcon,
	artifact: CirclesThreePlusIcon
} as Record<Module, Icon>

export const module_icon_string = {
	chat: 'chat',
	research: 'cube-transparent',
	agent: 'cowboy-hat',
	flow: 'tree-structure',
	linkcase: 'bookmarks',
	memory: 'graph',
	note: 'feather',
	database: 'database',
	artifact: 'circles-three-plus'
} as Record<Module, string>

interface IProps extends IconProps {
	module: Module
}

const Index = ({ module, ...props }: IProps) => {
	const Icon = useMemo(() => module_icon[module], [module])

	return <Icon {...props}></Icon>
}

export default $app.memo(Index)
