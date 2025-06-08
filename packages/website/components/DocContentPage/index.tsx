'use client'

import { useLayoutEffect, useState } from 'react'
import { useLocalStorageState, useMemoizedFn } from 'ahooks'

import { SidebarIcon } from '@phosphor-icons/react'
import { Drawer, Markdown, Toc } from '@website/components'
import { useMediaQuery, useUserMove } from '@website/hooks'
import { $ } from '@website/utils'

import styles from './index.module.css'

import type { AnchorProps } from 'antd'

interface IProps {
	md: string
	toc: AnchorProps['items']
	fm?: any
	className?: string
}

export const toc_emitter = new EventTarget()

const Index = (props: IProps) => {
	const { md, toc, className, fm } = props
	const [open_toc, setOpenToc] = useState(false)
	const [blog_open_toc, setBlogOpenToc] = useLocalStorageState<boolean>('blog_open_toc')
	const move = useUserMove()
	const is_mobile = useMediaQuery('(max-width: 720px)')

	useLayoutEffect(() => setOpenToc(blog_open_toc!), [blog_open_toc])

	const toggle = useMemoizedFn(() => {
		setBlogOpenToc(!open_toc)
	})

	return (
		<div className={$.cx('w_100 border_box', styles.wrap, open_toc && styles.open_toc)}>
			<div
				className={$.cx(
					'btn_toc fixed z_index_1000 flex justify_center align_center clickable',
					move && 'visible'
				)}
				onClick={toggle}
			>
				<SidebarIcon></SidebarIcon>
			</div>
			<div className={$.cx('small_container_wrap', className, fm?.date && 'has_date')}>
				{fm?.date && <div className='date w_100 text_center'>{fm.date}</div>}
				<Markdown md={md}></Markdown>
			</div>
			<Drawer
				class_name={styles.drawer}
				mask_class_name={styles.drawer_mask}
				open={open_toc}
				width='72vw'
				mask_closable
				body_lock={is_mobile}
				onClose={toggle}
			>
				<div
					className={$.cx(
						'h_100vh border_box flex align_center',
						styles.toc,
						styles.in_drawer,
						styles.open
					)}
				>
					<Toc list={toc}></Toc>
				</div>
			</Drawer>
			<div
				className={$.cx(
					'h_100vh border_box fixed top_0 left_0 flex align_center',
					styles.toc,
					open_toc && styles.open
				)}
			>
				<Toc list={toc}></Toc>
			</div>
		</div>
	)
}

export default $.memo(Index)
