import { useLayoutEffect, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { App, ConfigProvider } from 'antd'
import { observer } from 'mobx-react-lite'
import { useOutlet } from 'react-router-dom'
import { container } from 'tsyringe'

import { GlobalProvider } from '@/context'
import { useAntdLocale, useTheme } from '@/hooks'
import Global from '@/models/global'
import { is_win_electron } from '@/utils'

import { AntdApp, Setting, Stacks, WinActions } from './components'
import { useGlobalUtils } from './hooks'

import styles from './index.module.css'

import type { ConfigProviderProps } from 'antd/es/config-provider'
import type { IPropsSetting, IPropsStacks } from './types'

const Index = () => {
	// const [global] = useState(() => container.resolve(Global))
	// const outlet = useOutlet()
	// const locale = useAntdLocale(global.setting.lang)
	// const theme = useTheme(global.setting.theme)
	// const columns = $copy(global.stack.columns)

	return 666
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
