import { Input } from 'antd'

import { Icon, IconPicker } from '@/components'
import { confirm } from '@/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CheckIcon, DotsSixVerticalIcon, TrashIcon } from '@phosphor-icons/react'

import type { App } from '@/models'
import type { Workspace } from '@/types'

interface IProps {
	workspaces: App['workspaces']
	workspace: App['workspace']
	item: Workspace
	index: number
	getKey: (index: number) => number
	remove: (index: number) => void
	replace: (index: number, item: Workspace) => void
}

const Index = (props: IProps) => {
	const { workspaces, workspace, item, index, getKey, remove, replace } = props

	const { attributes, listeners, transform, transition, setNodeRef, setActivatorNodeRef } = useSortable({
		id: getKey(index),
		data: { index }
	})

	return (
		<div
			className='workspace_item flex justify_between align_center'
			style={{ transform: CSS.Translate.toString(transform), transition }}
			ref={setNodeRef}
			{...attributes}
		>
			<IconPicker
				zIndex={3000}
				hide_arrow
				onSelect={(v, type) => {
					replace(index, { ...item, icon: v, icon_type: type })
				}}
			>
				<div>
					<div className='icon_wrap btn border_box flex justify_center align_center clickable'>
						<Icon id={item.icon} icon_type={item.icon_type}></Icon>
					</div>
				</div>
			</IconPicker>
			<Input
				className='input_name'
				placeholder='A unique name'
				maxLength={18}
				value={item.name}
				onChange={e => {
					replace(index, { ...item, name: e.target.value })
				}}
			></Input>
			<div
				className='btn border_box flex justify_center align_center clickable'
				onClick={
					workspace !== item.name
						? async () => {
								if (workspaces.find(i => i.name === item.name)) {
									const res = await confirm({
										title: '注意',
										content: '移除工作区将会删除该工作区下的所有文件，确认删除该工作区？点击保存生效，请谨慎操作！',
										zIndex: 3001,
										danger: true
									})

									if (!res) return
								}

								remove(index)
							}
						: undefined
				}
			>
				<Choose>
					<When condition={workspace !== item.name}>
						<TrashIcon></TrashIcon>
					</When>
					<Otherwise>
						<CheckIcon></CheckIcon>
					</Otherwise>
				</Choose>
			</div>
			<div
				className='btn border_box flex justify_center align_center clickable'
				ref={setActivatorNodeRef}
				{...listeners}
			>
				<DotsSixVerticalIcon weight='bold'></DotsSixVerticalIcon>
			</div>
		</div>
	)
}

export default $app.memo(Index)
