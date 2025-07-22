import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Menu, Item as MenuItem, Separator, useContextMenu } from 'react-contexify'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Icon, module_icon_string } from '@/components'
import { useDelegate } from '@/hooks'
import { ipc } from '@/utils'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { BookmarkSimpleIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react'

import Item from './Item'

import styles from './index.module.css'

import type { Module } from '@/types'
import type { FileIndex, FileIndexs } from '@desktop/schemas'
import type { DragEndEvent } from '@dnd-kit/core'
import type { FocusEvent } from 'react'

export interface IProps {
	className?: string
	id: string
	items: FileIndexs
	flat?: boolean
	sortable?: boolean
	disable_favorite?: boolean
	setItems: (index: number, v: Partial<FileIndex>) => void
	removeItem: (id: string, index: number) => void
	move?: (from: number, to: number) => void
}

const Index = (props: IProps) => {
	const { className, id, items, flat, sortable, disable_favorite, setItems, removeItem, move } = props
	const [focusing, setFocusing] = useState<number>()
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
	const { t } = useTranslation()

	const { show } = useContextMenu({ id })

	const ref = useDelegate(
		(v, e) => {
			if (v === undefined) return

			show({ event: e as MouseEvent, props: { index: Number(v) } })
		},
		{ event_type: 'contextmenu', visible: items.length > 0 }
	)

	const onRemove = useMemoizedFn(e => {
		removeItem(items[e.props.index].id, e.props.index)
	})

	const onEdit = useMemoizedFn(e => {
		setFocusing(e.props.index)
	})

	const onAddToFavorite = useMemoizedFn(e => {
		ipc.file.list.add.mutate({ module: 'global', filename: 'favorite', items: [items[e.props.index].id] })
	})

	const onChangeFileIndex = useMemoizedFn((v: Partial<FileIndex>) => {
		ipc.file.write.mutate({ module: 'file_index', filename: items[focusing!].id, data: v, merge: true })
	})

	const onChangeIcon = useMemoizedFn((v: string, type: 'icon' | 'emoji') => {
		const target = { icon: v, icon_type: type }

		setItems(focusing!, target)
		onChangeFileIndex(target)
		setFocusing(undefined)
	})

	const onChangeName = useMemoizedFn((e: FocusEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (!value || value === items[focusing!].name) return setFocusing(undefined)

		const target = { name: value }

		setItems(focusing!, target)
		onChangeFileIndex(target)
		setFocusing(undefined)
	})

	const onDragEnd = useMemoizedFn(({ active, over }: DragEndEvent) => {
		if (!over) return

		move?.(active.data.current!.index, over.data.current!.index)
	})

	const getIcon = useMemoizedFn((item: FileIndex, focusing?: boolean) => (
		<span
			className={$cx('icon_wrap border_box flex justify_center align_center', focusing && 'clickable')}
			key={item.id}
		>
			<Icon
				id={item.icon && item.icon !== '' ? item.icon : module_icon_string[item.module as Module]}
				icon_type={item.icon_type}
			></Icon>
		</span>
	))

	if (!items.length) return

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local, flat && styles.flat, className)}>
			<div className='list_wrap flex flex_column' ref={ref}>
				<DndContext sensors={sensors} onDragEnd={onDragEnd}>
					<SortableContext items={items} strategy={verticalListSortingStrategy}>
						{items.map((item, index) => (
							<Item
								{...{
									item,
									index,
									flat,
									sortable,
									getIcon,
									onChangeIcon,
									onChangeName
								}}
								focusing={focusing === index}
								key={item.id}
							></Item>
						))}
					</SortableContext>
				</DndContext>
			</div>
			{createPortal(
				<Menu id={id}>
					<If condition={!disable_favorite}>
						<MenuItem onClick={onAddToFavorite}>
							<BookmarkSimpleIcon size={15}></BookmarkSimpleIcon>
							<span>{`${t('add')}${t('b')}${t('to')}${t('b')}${t('favorite')}`}</span>
						</MenuItem>
					</If>
					<MenuItem onClick={onEdit}>
						<PencilSimpleIcon size={15}></PencilSimpleIcon>
						<span>{t('edit')}</span>
					</MenuItem>
					<If condition={!disable_favorite}>
						<Separator></Separator>
					</If>
					<MenuItem onClick={onRemove}>
						<TrashIcon size={15}></TrashIcon>
						<span>{t('remove')}</span>
					</MenuItem>
				</Menu>,
				document.body
			)}
		</div>
	)
}

export default $app.memo(Index)
