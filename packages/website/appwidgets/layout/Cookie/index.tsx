'use client'

import { useMemoizedFn } from 'ahooks'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Cookie } from '@phosphor-icons/react'
import { $ } from '@website/utils'
import { is_server } from '@website/utils/const'

import styles from './index.module.css'

const Index = () => {
	const t = useTranslations('layout')
	const [cookie_ok, setCookieOk] = useState(true)

	useEffect(() => {
		if (!is_server) {
			const ok = localStorage.getItem('cookie_ok')

			if (!ok) setCookieOk(false)
		}
	}, [])

	const get = useMemoizedFn(() => {
		setCookieOk(true)

		localStorage.setItem('cookie_ok', '1')
	})

	return !cookie_ok ? (
		<div className={$.cx('fixed z_index_100 flex justify_center', styles._local)}>
			<div className='cookie_wrap flex align_center'>
				<div className='icon_wrap flex justify_center align_center'>
					<Cookie weight='duotone' size={24}></Cookie>
				</div>
				<div className='desc'>{t('Cookie.desc')}</div>
				<button className='btn_get_wrap flex justify_center align_center clickable' onClick={get}>
					{t('Cookie.btn_get')}
				</button>
			</div>
		</div>
	) : null
}

export default $.memo(Index)
