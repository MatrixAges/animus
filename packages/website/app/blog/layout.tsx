'use client'

import { useParams } from 'next/navigation'

import { $ } from '@website/utils'

import styles from './layout.module.css'

import type { PropsWithChildren } from 'react'

const Index = (props: PropsWithChildren) => {
	const { children } = props
	const params = useParams<{ id: Array<string> }>()

	if (!params.id) return children as React.JSX.Element

	return <div className={$.cx('w_100', styles._local)}>{children}</div>
}

export default $.memo(Index)
