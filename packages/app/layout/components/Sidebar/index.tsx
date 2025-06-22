import { useTranslation } from 'react-i18next'

import { Header, List, Modules } from './components'

import styles from './index.module.css'

import type { IPropsSidebar, IPropsSidebarHeader, IPropsSidebarList, IPropsSidebarModules } from '@/layout'

const Index = (props: IPropsSidebar) => {
	const { favorite_items, recent_items, toggleSetting, closeSidebar, addPage } = props
	const { t } = useTranslation()

	const props_header: IPropsSidebarHeader = {
		toggleSetting,
		closeSidebar
	}

	const props_modules: IPropsSidebarModules = {
		addPage
	}

	const props_favorite: IPropsSidebarList = {
		title: t('layout.Sidebar.favorite'),
		items: favorite_items
	}

	const props_recent: IPropsSidebarList = {
		title: t('layout.Sidebar.recent'),
		items: recent_items
	}

	return (
		<div className={$cx('w_100 h_100 flex flex_column', styles._local)}>
			<Header {...props_header}></Header>
			<div className='body_wrap w_100 border_box'>
				<div className='content_wrap w_100 border_box flex flex_column'>
					<Modules {...props_modules}></Modules>
					<List {...props_favorite}></List>
					<List {...props_recent}></List>
				</div>
			</div>
		</div>
	)
}

export default $app.memo(Index)
