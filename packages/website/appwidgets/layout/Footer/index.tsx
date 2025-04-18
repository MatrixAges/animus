'use client'

import { useMemoizedFn } from 'ahooks'

import { Moon, SunDim } from '@phosphor-icons/react'
import { LocaleSelect } from '@website/components'
import { useTheme } from '@website/hooks'
import { $ } from '@website/utils'

import styles from './index.module.css'

const Index = () => {
	const { theme, setTheme } = useTheme()

	const setDark = useMemoizedFn(() => setTheme('dark'))
	const setLight = useMemoizedFn(() => setTheme('light'))

	return (
		<div
			className={$.cx(
				'w_100 border_box flex align_center justify_between relative z_index_1000',
				styles._local
			)}
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
					<Moon weight='fill'></Moon>
				</div>
				<div
					className={$.cx(
						'theme_item flex justify_center align_center clickable',
						theme === 'light' && 'active'
					)}
					onClick={setLight}
				>
					<SunDim weight='fill'></SunDim>
				</div>
			</div>
		</div>
	)
}

export default $.memo(Index)
