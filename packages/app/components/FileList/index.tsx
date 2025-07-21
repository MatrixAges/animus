import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
import { Item, Menu, Separator, useContextMenu } from 'react-contexify'
import { createPortal } from 'react-dom'

import { Icon, IconPicker, module_icon_string } from '@/components'
import { useDelegate } from '@/hooks'
import { ipc } from '@/utils'
import { BookmarkSimpleIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { Module } from '@/types'
import type { FileIndex, FileIndexs } from '@desktop/schemas'
import type { FocusEvent } from 'react'

export interface IProps {
	className?: string
	id: string
	items: FileIndexs
	flat?: boolean
	disable_favorite?: boolean
	setItems: (index: number, v: Partial<FileIndex>) => void
	removeItem: (id: string, index: number) => void
}

const Index = (props: IProps) => {
	const { className, id, items, flat, disable_favorite, setItems, removeItem } = props
	const [focusing, setFocusing] = useState<number>()

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
		ipc.file.write.mutate({ module: 'file_index', filename: items[focusing!].id, data: v })
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
				{items.map((item, index) => (
					<div
						className={$cx(
							'w_100 border_box list_item_wrap flex align_center',
							focusing === index ? 'focusing' : 'clickit',
							flat && 'flat justify_between'
						)}
						data-key={index}
						key={item.id}
					>
						<div className='left_wrap w_100 border_box flex align_center'>
							<Choose>
								<When condition={focusing === index}>
									<IconPicker placement='right' hide_arrow onSelect={onChangeIcon}>
										{getIcon(item, true)}
									</IconPicker>

									<input
										className='name line_clamp_1 border_box'
										defaultValue={item.name}
										onBlur={onChangeName}
									/>
								</When>
								<Otherwise>
									{getIcon(item)}
									<span className='name line_clamp_1'>{item.name}</span>
								</Otherwise>
							</Choose>
						</div>

						<If condition={flat}>
							<span className='create_at text_right'>
								{dayjs(item.create_at).fromNow()}
							</span>
						</If>
					</div>
				))}
			</div>
			{createPortal(
				<Menu id={id}>
					<If condition={!disable_favorite}>
						<Item onClick={onAddToFavorite}>
							<BookmarkSimpleIcon size={15}></BookmarkSimpleIcon>
							<span>Add to favorite</span>
						</Item>
					</If>
					<Item onClick={onEdit}>
						<PencilSimpleIcon size={15}></PencilSimpleIcon>
						<span>Edit</span>
					</Item>
					<If condition={!disable_favorite}>
						<Separator></Separator>
					</If>
					<Item onClick={onRemove}>
						<TrashIcon size={15}></TrashIcon>
						<span>Remove</span>
					</Item>
				</Menu>,
				document.body
			)}
		</div>
	)
}

export default $app.memo(Index)
