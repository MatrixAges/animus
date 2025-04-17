import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { $ } from '@website/utils'

import styles from './index.module.css'

interface LinkItem {
	label: string
	key: string
}

interface IProps {
	prev?: LinkItem | null
	next?: LinkItem | null
}

const Index = (props: IProps) => {
	const { prev, next } = props
	const t = useTranslations('doc')

	return (
		<div className={$.cx('w_100 border_box', styles._local)}>
			<div className='bottom_link_items border_box flex'>
				{prev && (
					<Link className='link_item prev flex flex_column clickable' href={`/docs/${prev.key}`}>
						<div className='link_item_top flex align_center'>
							<CaretLeft weight='bold'></CaretLeft>
							<span className='link_item_direction'>{t('BottomLink.prev')}</span>
						</div>
						<span className='link_item_title'>{prev.label}</span>
					</Link>
				)}
				{next && (
					<Link
						className='link_item next flex flex_column align_end clickable'
						href={`/docs/${next.key}`}
					>
						<div className='link_item_top flex align_center'>
							<span className='link_item_direction'>{t('BottomLink.next')}</span>
							<CaretRight weight='bold'></CaretRight>
						</div>
						<span className='link_item_title'>{next.label}</span>
					</Link>
				)}
			</div>
		</div>
	)
}

export default $.memo(Index)
