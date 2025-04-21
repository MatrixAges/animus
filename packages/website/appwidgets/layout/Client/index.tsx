'use client'

import { useIsomorphicLayoutEffect } from 'ahooks'
import Cookies from 'js-cookie'
import { minimatch } from 'minimatch'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useMemo, PropsWithChildren } from 'react'

import { ProgressProvider } from '@bprogress/next/app'
import { LOCALE, THEME } from '@website/appdata'
import { $ } from '@website/utils'

import { Cookie, Footer, Menu, Progress } from '../'
import styles from './index.module.css'

import type { App } from '@website/types'
import type { AppProgressProviderProps } from '@bprogress/next'

const excludes = ['/docs']
const progress_path = ['/', '/blog/*']

export interface IPropsClient extends PropsWithChildren {
	locale: App.Locales
	locale_cookie_exsit: boolean
	theme: App.Theme
	theme_cookie_exsit: boolean
}

const Index = (props: IPropsClient) => {
	const { children, locale, locale_cookie_exsit, theme, theme_cookie_exsit } = props
	const pathname = usePathname()

	useIsomorphicLayoutEffect(() => {
		if (typeof document === 'undefined') return

		import('@website/utils/SmoothScroll').then(res => {
			res.default({ animationTime: 450, stepSize: 72, touchpadSupport: true })
		})
	}, [])

	useLayoutEffect(() => {
		if (locale_cookie_exsit) return

		Cookies.set(LOCALE, locale, { expires: 360 })
	}, [locale, locale_cookie_exsit])

	useLayoutEffect(() => {
		if (theme_cookie_exsit) return

		Cookies.set(THEME, theme, { expires: 360 })
	}, [theme, theme_cookie_exsit])

	const show_layout = useMemo(() => !excludes.some(item => pathname.indexOf(item) !== -1), [pathname])
	const show_progress = useMemo(() => progress_path.some(item => minimatch(pathname, item)), [pathname])

	const props_bar: AppProgressProviderProps = {
		height: '1.5px',
		color: 'var(--color_text_sub)',
		options: { showSpinner: false }
	}

	return (
		<div className={$.cx('w_100 flex flex_column', styles._local)}>
			<Cookie></Cookie>
			{show_progress && <Progress></Progress>}
			{show_layout && <Menu></Menu>}
			<ProgressProvider {...props_bar}>{children}</ProgressProvider>
			{show_layout && <Footer></Footer>}
		</div>
	)
}

export default $.memo(Index)
