'use client'

import { useState } from 'react'
import { useEventListener, useMemoizedFn } from 'ahooks'
import { throttle } from 'lodash-es'

import { $ } from '@website/utils'

import styles from './index.module.css'

const Index = () => {
	const [width, setWidth] = useState<string>()

	const scroll = useMemoizedFn(
		throttle(
			() => {
				const scroll = document.body.scrollTop || document.documentElement.scrollTop
				const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
				const scrolled = (scroll / height) * 100

				setWidth(height > 0 ? `${scrolled}%` : undefined)
			},
			600,
			{ leading: false }
		)
	)

	useEventListener('scroll', scroll)

	return <div className={$.cx('fixed top_0 left_0 flex justify_center', styles._local)} style={{ width }}></div>
}

export default $.memo(Index)
