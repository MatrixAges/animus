'use client'

import styles from './index.module.css'

import { LocaleSelect } from '@website/components'
import { useTheme, useUserMove } from '@website/hooks'
import { $ } from '@website/utils'

import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useMemoizedFn } from 'ahooks'
import { FloatButton } from 'antd'
import { useInView } from 'motion/react'
import { Fragment, useRef } from 'react'

import type { NextRequest } from 'next/server'

const BackTop = FloatButton.BackTop

const Index = () => {
	const { theme, setTheme } = useTheme()
	const ref = useRef(null)
	const visible = useInView(ref)
	const move = useUserMove()

	const a = {} as NextRequest

	const setDark = useMemoizedFn(() => setTheme('dark'))
	const setLight = useMemoizedFn(() => setTheme('light'))

	return (
		<Fragment>
			<BackTop
				className={$.cx(styles.backtop, move && styles.move, visible && styles.visible_footer)}
				visibilityHeight={1200}
			></BackTop>
			<div
				className={$.cx(
					'w_100 border_box flex align_center justify_between relative z_index_1000',
					styles._local
				)}
				ref={ref}
			>
				<LocaleSelect></LocaleSelect>
				<div className='theme_toggle flex'>
					<div
						className={$.cx(
							'theme_item flex justify_center align_center clickable',
							theme === 'dark' && 'active'
						)}
						onClick={setDark}
					>
						<MoonIcon weight={theme === 'dark' ? 'fill' : 'regular'}></MoonIcon>
					</div>
					<div
						className={$.cx(
							'theme_item flex justify_center align_center clickable',
							theme === 'light' && 'active'
						)}
						onClick={setLight}
					>
						<SunIcon weight={theme === 'light' ? 'fill' : 'regular'}></SunIcon>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default $.memo(Index)
