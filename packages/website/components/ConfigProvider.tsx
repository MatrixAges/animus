'use client'

import '@ant-design/v5-patch-for-react-19'

import { ConfigProvider } from 'antd'
import { useMemo } from 'react'
import { memo } from 'stk/react'

import { useAntdLocale } from '@website/hooks'
import { getAntdTheme } from '@website/theme'

import type { PropsWithChildren } from 'react'

import type { ConfigProviderProps } from 'antd/es/config-provider'
import type { App } from '@website/types'

interface IProps extends PropsWithChildren {
	locale: App.Locales
	theme: App.Theme
}

const Index = (props: IProps) => {
	const { children, locale, theme } = props
	const app_locale = useAntdLocale(locale)
	const app_theme = useMemo(() => getAntdTheme(theme), [theme])

	const props_config_provider: ConfigProviderProps = {
		prefixCls: 'ani',
		iconPrefixCls: 'ani-icon',
		locale: app_locale,
		theme: app_theme,
		virtual: false,
		getPopupContainer: n => n?.parentElement!
	}

	return <ConfigProvider {...props_config_provider}>{children}</ConfigProvider>
}

export default memo(Index)
