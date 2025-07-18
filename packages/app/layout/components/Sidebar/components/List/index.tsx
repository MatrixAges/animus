import { useMemoizedFn } from 'ahooks'
import { Item, Menu, useContextMenu } from 'react-contexify'
import { createPortal } from 'react-dom'

import { Icon, module_icon_string } from '@/components'
import { useDelegate } from '@/hooks'
import { ipc } from '@/utils'
import { TrashIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsSidebarList } from '@/layout'

const Index = (props: IPropsSidebarList) => {
	const { title, items } = props
	const length = Object.keys(items).length

	const { show } = useContextMenu({ id: 'sidebar_recent' })

	const ref = useDelegate(
		(v, e) => {
			if (!v) return

			show({ event: e as MouseEvent, props: { id: v } })
		},
		{ event_type: 'contextmenu', visible: length > 0 }
	)

	const onRemove = useMemoizedFn(e => {
		const id = e.props.id

		ipc.file.recent.remove.mutate({ module: 'global', id })
	})

	if (!length) return

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<span className='title'>{title}</span>
			<div className='list_wrap flex flex_column' ref={ref}>
				{Object.keys(items).map(key => (
					<div
						className='w_100 border_box list_item_wrap flex align_center clickit'
						data-key={items[key].id}
						key={items[key].id}
					>
						<span className='icon_wrap flex align_center'>
							<Icon
								id={
									items[key].icon && items[key].icon !== ''
										? items[key].icon
										: module_icon_string[items[key].module]
								}
							></Icon>
						</span>
						<span className='name line_clamp_1'>{items[key].name}</span>
					</div>
				))}
			</div>
			{createPortal(
				<Menu id='sidebar_recent'>
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
