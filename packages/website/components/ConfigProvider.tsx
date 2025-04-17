'use client'

import '../appdata/mobx'

import { useMemoizedFn } from 'ahooks'
import { ConfigProvider } from 'antd'
import { useLayoutEffect, useState } from 'react'
import { memo } from 'stk/react'

import { useAntdLocale } from '@website/hooks'
import { getAntdTheme } from '@website/theme'
import retryUntil from '@website/utils/retryUntil'

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
	const [app_theme, setAppTheme] = useState(() => getAntdTheme(theme))

	const onChangeTheme = useMemoizedFn(({ detail }: any) => {
		const target_theme = getAntdTheme(detail)

		setAppTheme(target_theme)
	})

	useLayoutEffect(() => {
		retryUntil(
			() => {
				window.__theme_emitter.addEventListener('changeTheme', onChangeTheme)
				window.__theme_listened = true
			},
			() => window.__theme_emitter
		)

		return () => window.__theme_emitter.removeEventListener('changeTheme', onChangeTheme)
	}, [])

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
