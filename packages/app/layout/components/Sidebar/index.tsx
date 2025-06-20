import { Header, Modules } from './components'

import styles from './index.module.css'

import type { IPropsSidebar, IPropsSidebarHeader } from '@/layout'

const Index = (props: IPropsSidebar) => {
	const { toggleSetting, closeSidebar } = props

	const props_header: IPropsSidebarHeader = {
		toggleSetting,
		closeSidebar
	}

	return (
		<div className={$cx('w_100 h_100 flex flex_column', styles._local)}>
			<Header {...props_header}></Header>
			<div className='body_wrap w_100 border_box'>
				<div className='content_wrap w_100 border_box flex flex_column'>
					<Modules></Modules>
				</div>
			</div>
		</div>
	)
}

export default $app.memo(Index)
