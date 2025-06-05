import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { AlignLeft, Hash } from 'lucide-react'
import Link from 'next/link'

import { $ } from '@website/utils'

import type { IndexItem } from '.'

interface IProps extends IndexItem {
	index: number
	active: boolean
	setIndex: (v: number) => void
}

const Index = (props: IProps) => {
	const { link, type, headings, content, index, active, setIndex } = props

	const { hs, anchor } = useMemo(() => {
		const arr = headings.split('>')

		return { hs: arr.join(' > '), anchor: arr.at(-1) }
	}, [type, headings])

	const hoverItem = useMemoizedFn(() => setIndex(index))

	return (
		<Link
			className={$.cx('search_item w_100 border_box flex', active && 'active')}
			href={`/docs/${link}#${anchor}`}
			title={content}
			onMouseOver={hoverItem}
		>
			<div className='icon_wrap flex justify_center align_start'>
				{type === 'heading' ? <Hash size={16}></Hash> : <AlignLeft size={16}></AlignLeft>}
			</div>
			<div className='right_wrap flex align_center relative'>
				<span className='content line_clamp_1'>{content}</span>
				<span className='headings absolute right_0'>{hs}</span>
			</div>
		</Link>
	)
}

export default $.memo(Index)
