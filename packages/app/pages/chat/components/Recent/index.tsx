import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
import { Item, Menu, useContextMenu } from 'react-contexify'

import { useDelegate } from '@/hooks'
import { ipc } from '@/utils'
import { DotsThreeVerticalIcon, TrashIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsRecent } from '../../types'

const Index = (props: IPropsRecent) => {
	const { recent } = props
	const length = Object.keys(recent).length

	const { show } = useContextMenu({ id: 'chat_recent' })

	const ref = useDelegate(
		(v, e) => {
			if (!v) return

			show({ event: e as MouseEvent, props: { id: v } })
		},
		{ event_type: 'contextmenu', visible: length > 0 }
	)

	const onRemove = useMemoizedFn(e => {
		const id = e.props.id

		ipc.file.recent.remove.mutate({ module: 'chat', id })
	})

	if (!length) return

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<div className='section_title_wrap flex justify_between align_center'>
				<h2 className='section_title'>Recent</h2>
				<div className='btn_action flex justify_center align_center clickable'>
					<DotsThreeVerticalIcon weight='bold'></DotsThreeVerticalIcon>
				</div>
			</div>
			<div className='recent_items w_100 border_box flex flex_column' ref={ref}>
				{Object.keys(recent).map(key => (
					<div
						className='recent_item flex justify_between align_center cursor_point'
						data-key={recent[key].id}
						key={recent[key].id}
					>
						<span className='question'>{recent[key].name}</span>
						<span className='update_at'>{dayjs(recent[key].create_at).fromNow()}</span>
					</div>
				))}
			</div>
			<Menu id='chat_recent'>
				<Item onClick={onRemove}>
					<TrashIcon size={15}></TrashIcon>
					<span>Remove</span>
				</Item>
			</Menu>
		</div>
	)
}

export default $app.memo(Index)
