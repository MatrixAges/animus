import { Icon, module_icon_string } from '@/components'

import styles from './index.module.css'

import type { IPropsSidebarList } from '@/layout'

const Index = (props: IPropsSidebarList) => {
	const { title, items } = props

	if (!Object.keys(items).length) return

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<span className='title'>{title}</span>
			<div className='list_wrap flex flex_column'>
				{Object.keys(items).map(key => (
					<div
						className='w_100 border_box list_item_wrap flex align_center clickit'
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
		</div>
	)
}

export default $app.memo(Index)
