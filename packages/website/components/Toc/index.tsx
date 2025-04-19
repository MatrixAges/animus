'use client'

import { Anchor } from 'antd'
import { useTranslations } from 'next-intl'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { AnchorProps } from 'antd'

interface IProps {
	list: AnchorProps['items']
	className?: string
}

const Index = (props: IProps) => {
	const { list, className } = props
	const t = useTranslations('docs')

	return (
		<div className={$.cx('w_100 border_box flex flex_column', styles._local, className)}>
			<Anchor items={list} affix={false}></Anchor>
		</div>
	)
}

export default $.memo(Index)
