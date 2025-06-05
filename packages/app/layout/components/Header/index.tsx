import { SidebarIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsHeader } from '@/layout/types'

const Index = (props: IPropsHeader) => {
	const { toggleFold } = props

	return (
		<div className={$cx('w_100 border_box flex justify_between align_center sticky top_0', styles._local)}>
			<div
				className='btn_fold flex justify_center align_center clickable transition_normal'
				onClick={toggleFold}
			>
				<SidebarIcon></SidebarIcon>
			</div>
		</div>
	)
}

export default $app.memo(Index)
