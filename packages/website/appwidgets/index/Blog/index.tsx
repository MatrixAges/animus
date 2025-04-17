'use client'

import { useTranslations } from 'next-intl'
import Markdown from 'react-markdown'

import md_styles from '@website/styles/markdown.module.css'
import { $ } from '@website/utils'

import styles from './index.module.css'

import type { IPropsBlog } from '../types'

const Index = (props: IPropsBlog) => {
	const { content } = props
	const t = useTranslations('index')

	return (
		<div
			className={$.cx(
				'flex flex_column align_center justify_center relative',
				styles._local,
				md_styles.md,
				md_styles.serif
			)}
		>
			<div className='md_container_wrap'>
				<Markdown>{content}</Markdown>
			</div>
		</div>
	)
}

export default $.memo(Index)
