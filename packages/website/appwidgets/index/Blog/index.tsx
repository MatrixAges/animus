'use client'

import { useEventListener, useMemoizedFn } from 'ahooks'
import { throttle } from 'lodash-es'
import { useMemo, useState } from 'react'
import Markdown from 'react-markdown'

import md_styles from '@website/styles/markdown.module.css'
import { $ } from '@website/utils'

import styles from './index.module.css'

import type { IPropsBlog } from '../types'

const Index = (props: IPropsBlog) => {
	const { content } = props
	const [top, setTop] = useState<number>()

	const scroll = useMemoizedFn(
		throttle(
			() => {
				const client_height = document.documentElement.clientHeight
				const distance = client_height - document.documentElement.scrollTop

				if (distance > 0) {
					const scrolled = distance / client_height

					setTop(scrolled)
				} else {
					setTop(0)
				}
			},
			120,
			{ leading: false }
		)
	)

	useEventListener('scroll', scroll)

	const radius = useMemo(() => {
		if (top === undefined)
			return {
				value: 81,
				percent: '81%'
			}

		const value = 120 * top
		const hide = value <= 18

		return {
			hide,
			percent: `calc(120% * ${top})`
		}
	}, [top])

	return (
		<div
			className={$.cx(
				'flex flex_column align_center relative',
				styles._local,
				md_styles.md,
				md_styles.serif
			)}
		>
			<div
				className={$.cx('skyline absolute top_0', radius.hide && 'hide')}
				style={{ borderRadius: radius.percent }}
			></div>
			<div className={$.cx('small_container_wrap relative', radius.hide && 'blur')}>
				<Markdown>{content}</Markdown>
			</div>
		</div>
	)
}

export default $.memo(Index)
