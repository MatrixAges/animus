import { useLayoutEffect, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { App, ConfigProvider } from 'antd'
import { observer } from 'mobx-react-lite'
import { useOutlet } from 'react-router-dom'
import { container } from 'tsyringe'

import { GlobalProvider } from '@/context'
import { useAntdLocale, useTheme } from '@/hooks'
import Global from '@/models/global'

import { Header, Sidebar } from './components'
import { useGlobalUtils } from './hooks'

import styles from './index.module.css'

import type { IPropsHeader, IPropsSidebar } from './types'

const Index = () => {
	const [global] = useState(() => container.resolve(Global))
	const outlet = useOutlet()
	const locale = useAntdLocale(global.setting.lang)
	const theme = useTheme(global.setting.theme)

	useGlobalUtils()

	useLayoutEffect(() => {
		global.init()

		return () => {
			global.off()
			container.dispose()
		}
	}, [])

	const props_sidebar: IPropsSidebar = {
		lang: global.setting.lang,
		theme: global.setting.theme,
		setLang: global.setting.setLang,
		setTheme: global.setting.setTheme
	}

	const props_header: IPropsHeader = {
		toggleFold: useMemoizedFn(() => (global.setting.fold = !global.setting.fold))
	}

	return (
		<GlobalProvider value={global}>
			<ConfigProvider locale={locale} theme={theme}>
				<App prefixCls='omni'>
					<Sidebar {...props_sidebar}></Sidebar>
					<div className={$cx('border_box', styles._local, global.setting.fold && styles.fold)}>
						<Header {...props_header}></Header>
						<div className={$cx('w_100 border_box', styles.container)}>{outlet}</div>
					</div>
				</App>
			</ConfigProvider>
		</GlobalProvider>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
