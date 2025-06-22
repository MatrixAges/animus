import { Icon } from '@/components'

import styles from './index.module.css'

import type { IPropsSidebarList } from '@/layout'

const Index = (props: IPropsSidebarList) => {
	const { title, items } = props

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<span className='title'>{title}</span>
			<div className='list_wrap flex flex_column'>
				{items.map(item => (
					<div className='w_100 border_box list_item_wrap flex align_center clickit' key={item.id}>
						<span className='icon_wrap flex align_center'>
							<Icon id={item.icon}></Icon>
						</span>
						<span className='name line_clamp_1'>{item.name}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default $app.memo(Index)
