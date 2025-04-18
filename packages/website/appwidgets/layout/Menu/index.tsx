'use client'

import { useEventListener, useMemoizedFn, useToggle } from 'ahooks'
import { throttle } from 'lodash-es'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { List, X } from '@phosphor-icons/react'
import { $ } from '@website/utils'

import styles from './index.module.css'

const Index = () => {
	const [open, { toggle, setLeft }] = useToggle()
	const [visible, setVisible] = useState(false)
	const timer = useRef<NodeJS.Timeout>(null)

	const move = useMemoizedFn(
		throttle(
			() => {
				if (timer.current) clearTimeout(timer.current)

				setVisible(true)

				timer.current = setTimeout(() => {
					setVisible(false)
					setLeft()
				}, 3000)
			},
			300,
			{ leading: false }
		)
	)

	useEventListener('mousemove', move)

	return (
		<div className={$.cx('fixed flex flex_column align_end', styles._local)}>
			<div className={$.cx('btn_wrap flex clickable', visible && 'visible')} onClick={toggle}>
				{open ? <X></X> : <List></List>}
			</div>
			{open && (
				<div className='menu_items flex flex_column justify_end'>
					<Link className='menu_item clickable' href='/'>
						Home
					</Link>
					<Link className='menu_item clickable' href='/doc'>
						Doc
					</Link>
				</div>
			)}
		</div>
	)
}

export default $.memo(Index)
