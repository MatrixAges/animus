import { useMemoizedFn } from 'ahooks'
import { useTranslation } from 'react-i18next'

import { FileList } from '@/components'
import { ipc } from '@/utils'

import { Header, Modules } from './components'

import styles from './index.module.css'

import type { IPropsFileList } from '@/components'
import type { IPropsSidebar, IPropsSidebarHeader, IPropsSidebarModules } from '@/layout'

const Index = (props: IPropsSidebar) => {
	const { favorite, recent, toggleSetting, closeSidebar, addPage, setFavoriteItems, setRecentItems } = props
	const { t } = useTranslation()

	const props_header: IPropsSidebarHeader = {
		toggleSetting,
		closeSidebar
	}

	const props_modules: IPropsSidebarModules = {
		addPage
	}

	const props_favorite: IPropsFileList = {
		id: 'sidebar_favorite',
		items: favorite,
		disable_favorite: true,
		setItems: setFavoriteItems,
		removeItem: useMemoizedFn(id => {
			ipc.file.list.remove.mutate({ module: 'global', filename: 'favorite', id })
		})
	}

	const props_recent: IPropsFileList = {
		id: 'sidebar_recent',
		items: recent,
		setItems: setRecentItems,
		removeItem: useMemoizedFn(id => {
			ipc.file.recent.remove.mutate({ module: 'global', id })
		})
	}

	return (
		<div className={$cx('w_100 h_100 flex flex_column', styles._local)}>
			<Header {...props_header}></Header>
			<div className='body_wrap w_100 border_box'>
				<div className='content_wrap w_100 border_box flex flex_column'>
					<Modules {...props_modules}></Modules>
					<If condition={favorite.length}>
						<span className='list_title'>{t('layout.Sidebar.favorite')}</span>
						<FileList {...props_favorite}></FileList>
					</If>
					<If condition={recent.length}>
						<span className='list_title'>{t('layout.Sidebar.recent')}</span>
						<FileList {...props_recent}></FileList>
					</If>
				</div>
			</div>
		</div>
	)
}

export default $app.memo(Index)
