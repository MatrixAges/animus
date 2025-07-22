import { useLayoutEffect, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { App, ConfigProvider } from 'antd'
import { observer } from 'mobx-react-lite'
import { container } from 'tsyringe'

import { GlobalModel, GlobalProvider } from '@/context'
import { useAntdLocale } from '@/hooks'
import Global from '@/models/global'

import { AntdApp, Empty, Setting, Sidebar, Stacks } from './components'
import { useAntdTheme, useGlobalUtils } from './hooks'

import styles from './index.module.css'

import type { Module } from '@/types'
import type { ConfigProviderProps } from 'antd/es/config-provider'
import type { IPropsEmpty, IPropsSetting, IPropsSidebar, IPropsStacks } from './types'

const Index = observer(({ global }: { global: GlobalModel }) => {
	const app = global.app
	const setting = global.setting
	const stack = global.stack
	const layout = global.layout

	const locale = useAntdLocale(setting.lang)
	const antd_theme = useAntdTheme(setting.theme_value, setting.glass)

	const columns = $copy(stack.columns)

	useGlobalUtils()

	const props_sidebar: IPropsSidebar = {
		favorite: $copy(Object.values(app.favorite)),
		recent: $copy(Object.values(app.recent)),
		toggleSetting: setting.toggleSetting,
		closeSidebar: layout.toggleSidebar,
		addPage: useMemoizedFn((module: Module) => stack.add({ type: 'page', module, id: module })),
		setFavoriteItems: app.setFavoriteItems,
		setRecentItems: app.setRecentItems,
		moveFavorite: app.moveFavorite
	}

	const props_empty: IPropsEmpty = {
		sidebar_fold: layout.sidebar_fold,
		showSidebar: layout.toggleSidebar,
		toggleSetting: setting.toggleSetting
	}

	const props_config_provider: ConfigProviderProps = {
		prefixCls: 'ani',
		iconPrefixCls: 'ani-icon',
		theme: antd_theme,
		locale,
		virtual: false
	}

	const props_stacks: IPropsStacks = {
		sidebar_fold: layout.sidebar_fold,
		columns,
		focus: $copy(stack.focus),
		container_width: stack.container_width,
		resizing: stack.resizing,
		remove: stack.remove,
		click: stack.click,
		update: stack.update,
		move: stack.move,
		resize: stack.resize,
		setResizing: useMemoizedFn((v: boolean) => (stack.resizing = v)),
		observe: stack.observe,
		unobserve: stack.unobserve,
		showSidebar: layout.toggleSidebar
	}

	const props_setting: IPropsSetting = {
		update_status: $copy(global.app.update_status),
		visible: setting.visible,
		active: setting.active,
		visible_menu: setting.visible_menu,
		onClose: useMemoizedFn(() => (setting.visible = false)),
		toggleMenu: useMemoizedFn(() => (setting.visible_menu = !setting.visible_menu)),
		onMenuItem: useMemoizedFn((key: string) => {
			setting.active = key

			if (setting.visible_menu) setting.visible_menu = false
		})
	}

	return (
		<GlobalProvider value={global}>
			<ConfigProvider {...props_config_provider}>
				<App prefixCls='ani'>
					<AntdApp></AntdApp>
					<div
						className={$cx(
							'w_100 relative',
							styles.container,
							layout.sidebar_fold && styles.fold
						)}
					>
						<div
							className={$cx(
								'h_100vh border_box absolute top_0 left_0',
								styles.sidebar_container
							)}
						>
							<Sidebar {...props_sidebar}></Sidebar>
						</div>
						<div className={$cx('h_100vh border_box relative', styles.stacks_container)}>
							<Choose>
								<When condition={columns.length > 0}>
									<Stacks {...props_stacks}></Stacks>
								</When>
								<Otherwise>
									<Empty {...props_empty}></Empty>
								</Otherwise>
							</Choose>
						</div>
					</div>
					<Setting {...props_setting}></Setting>
				</App>
			</ConfigProvider>
		</GlobalProvider>
	)
})

const Layout = () => {
	const [loading, setLoading] = useState(true)
	const [global] = useState(() => container.resolve(Global))

	useLayoutEffect(() => {
		global.init().then(_ => setLoading(false))

		return () => {
			global.off()
		}
	}, [])

	if (loading) return null

	return <Index global={global}></Index>
}

export default new $app.handle(Layout).by(observer).by($app.memo).get()

export * from './types'
export * from './components'
