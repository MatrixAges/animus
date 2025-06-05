'use client'

import { useLayoutEffect, useState } from 'react'
import { useMemoizedFn } from 'ahooks'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { useTheme } from '@website/hooks'
import { $ } from '@website/utils'
import { highlight } from '@website/utils/shiki'

import styles from './index.module.css'

import type { BundledLanguage } from 'shiki/bundle/web'

interface IProps {
	children: string
	language: BundledLanguage
}

const Index = (props: IProps) => {
	const { children, language } = props
	const { theme } = useTheme()
	const [html, setHTML] = useState<string>('')
	const [copyied, setCopyied] = useState(false)

	useLayoutEffect(() => {
		highlight(children, language, theme).then(setHTML)
	}, [children, language, theme])

	const copy = useMemoizedFn(() => {
		setCopyied(true)

		navigator.clipboard.writeText(children)

		setTimeout(() => {
			setCopyied(false)
		}, 3000)
	})

	return (
		<div className={$.cx('w_100 border_box relative', styles._local)}>
			<span className='lang absolute'>{language}</span>
			<button className='btn_copy flex justify_center align_center absolute clickable' onClick={copy}>
				{copyied ? <CheckIcon></CheckIcon> : <CopyIcon></CopyIcon>}
			</button>
			<div className='w_100 flex' dangerouslySetInnerHTML={{ __html: html }}></div>
		</div>
	)
}

export default $.memo(Index)
