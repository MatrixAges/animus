'use client'

import { useToggle } from 'ahooks'
import Link from 'next/link'

import { List, X } from '@phosphor-icons/react'
import { nav_links } from '@website/appdata'
import { useUserMove } from '@website/hooks'
import { $ } from '@website/utils'

import styles from './index.module.css'

const Index = () => {
	const [visible, { toggle, setLeft }] = useToggle()
	const move = useUserMove({ idle: setLeft })

	return (
		<div className={$.cx('fixed flex flex_column align_end', styles._local, visible && styles.visible)}>
			<div className={$.cx('btn_wrap flex clickable', move && 'visible')} onClick={toggle}>
				{visible ? <X></X> : <List></List>}
			</div>
			<nav className={$.cx('menu_items flex flex_column justify_end', visible && 'visible')}>
				{nav_links.map(item => (
					<Link
						className='menu_item clickable'
						href={item.href}
						target={item.href.indexOf('https') !== -1 ? '_blank' : '_self'}
						key={item.title}
					>
						{item.title}
					</Link>
				))}
			</nav>
		</div>
	)
}

export default $.memo(Index)
