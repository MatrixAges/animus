'use client'

import styles from './index.module.css'

import { $ } from '@website/utils'

import { Anchor } from 'antd'

import type { AnchorProps } from 'antd'

interface IProps {
	list: AnchorProps['items']
	className?: string
}

const Index = (props: IProps) => {
	const { list, className } = props

	return (
		<div className={$.cx('w_100 border_box flex flex_column', styles._local, className)}>
			<Anchor items={list} affix={false} offsetTop={450}></Anchor>
		</div>
	)
}

export default $.memo(Index)
