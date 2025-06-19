import { useLayoutEffect, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { App, ConfigProvider } from 'antd'
import { observer } from 'mobx-react-lite'
import { container } from 'tsyringe'

import { GlobalProvider } from '@/context'
import { useAntdLocale } from '@/hooks'
import Global from '@/models/global'
import { is_win_electron } from '@/utils'

import { AntdApp, Setting, Stacks, WinActions } from './components'
import { useAntdTheme, useGlobalUtils } from './hooks'

import styles from './index.module.css'

import type { ConfigProviderProps } from 'antd/es/config-provider'
import type { IPropsSetting, IPropsStacks } from './types'

const Index = () => {
	const [global] = useState(() => container.resolve(Global))
	const locale = useAntdLocale(global.setting.lang)
	const antd_theme = useAntdTheme(global.setting.theme_value)
	const columns = $copy(global.stack.columns)

	useGlobalUtils()

	useLayoutEffect(() => {
		global.init()

		return () => {
			global.off()
		}
	}, [])

	const props_config_provider: ConfigProviderProps = {
		prefixCls: 'ani',
		iconPrefixCls: 'ani-icon',
		theme: antd_theme,
		locale,
		virtual: false
	}

	const props_stacks: IPropsStacks = {
		columns,
		focus: $copy(global.stack.focus),
		container_width: global.stack.container_width,
		resizing: global.stack.resizing,
		remove: useMemoizedFn(global.stack.remove),
		click: useMemoizedFn(global.stack.click),
		update: useMemoizedFn(global.stack.update),
		move: useMemoizedFn(global.stack.move),
		resize: useMemoizedFn(global.stack.resize),
		setResizing: useMemoizedFn((v: boolean) => (global.stack.resizing = v)),
		observe: useMemoizedFn(global.stack.observe),
		unobserve: useMemoizedFn(global.stack.unobserve)
	}

	const props_setting: IPropsSetting = {
		update_status: $copy(global.app.update_status),
		visible: global.setting.visible,
		active: global.setting.active,
		visible_menu: global.setting.visible_menu,
		onClose: useMemoizedFn(() => (global.setting.visible = false)),
		toggleMenu: useMemoizedFn(() => (global.setting.visible_menu = !global.setting.visible_menu)),
		onMenuItem: useMemoizedFn((key: string) => {
			global.setting.active = key

			if (global.setting.visible_menu) global.setting.visible_menu = false
		})
	}

	return (
		<GlobalProvider value={global}>
			<ConfigProvider {...props_config_provider}>
				<App prefixCls='ani'>
					<AntdApp></AntdApp>
					{/* <div className='w_100vw h_100vh border_box relative'>
						<Choose>
							<When condition={columns.length > 0}>
								<Stacks {...props_stacks}></Stacks>
							</When>
							<Otherwise>
								<div
									className='is_drag w_100 absolute z_index_10 top_0 left_0 flex justify_end'
									style={{ height: 36 }}
								>
									<If condition={is_win_electron}>
										<WinActions></WinActions>
									</If>
								</div>
							</Otherwise>
						</Choose>
					</div> */}
					<img className='w_100vw h_100vh' src='/bg.jpg' style={{ objectFit: 'cover' }} />
					<Setting {...props_setting}></Setting>
				</App>
			</ConfigProvider>
		</GlobalProvider>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
