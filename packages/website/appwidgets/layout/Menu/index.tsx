'use client'

import styles from './index.module.css'

import { nav_links } from '@website/appdata'
import { useUserMove } from '@website/hooks'
import { $ } from '@website/utils'

import { ListIcon, XIcon } from '@phosphor-icons/react'
import { useToggle } from 'ahooks'
import Link from 'next/link'

const Index = () => {
	const [visible, { toggle, setLeft }] = useToggle()
	const move = useUserMove({ idle: setLeft })

	return (
		<div className={$.cx('fixed flex flex_column align_end', styles._local, visible && styles.visible)}>
			<div className={$.cx('btn_wrap flex clickable', move && 'visible')} onClick={toggle}>
				{visible ? <XIcon></XIcon> : <ListIcon></ListIcon>}
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
