import { useMemoizedFn } from 'ahooks'

import Logo from '@/public/simple.svg?react'
import { Moon, Sun, Translate } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsSidebar } from '@/layout/types'

const Index = (props: IPropsSidebar) => {
	const { lang, theme, setLang, setTheme } = props

	const toggleLang = useMemoizedFn(() => setLang(lang === 'en' ? 'zh-cn' : 'en'))
	const toggleTheme = useMemoizedFn(() => setTheme(theme === 'light' ? 'dark' : 'light'))

	return (
		<div className={$cx('flex flex_column h_100vh border_box fixed top_0 left_0', styles._local)}>
			<div className='header_wrap flex align_center justify_end relative'>
				<div className='logo_wrap h_100 flex justify_center align_center absolute'>
					<Logo className='h_100'></Logo>
				</div>
				<div className='actions_wrap flex align_center'>
					<div
						className='btn_setting flex justify_center align_center clickable'
						onClick={toggleLang}
					>
						<Translate></Translate>
					</div>
					<div
						className='btn_setting flex justify_center align_center clickable'
						onClick={toggleTheme}
					>
						{theme === 'dark' ? <Sun></Sun> : <Moon></Moon>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default $app.memo(Index)
