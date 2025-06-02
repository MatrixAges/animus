import styles from './index.module.css'

import { $ } from '@website/utils'

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

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
	const t = useTranslations('docs')

	return (
		<div className={$.cx('w_100 border_box', styles._local)}>
			<div className='bottom_link_items border_box flex'>
				{prev && (
					<Link className='link_item prev flex flex_column clickable' href={`/docs/${prev.key}`}>
						<div className='link_item_top flex align_center'>
							<CaretLeftIcon weight='bold'></CaretLeftIcon>
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
							<CaretRightIcon weight='bold'></CaretRightIcon>
						</div>
						<span className='link_item_title'>{next.label}</span>
					</Link>
				)}
			</div>
		</div>
	)
}

export default $.memo(Index)
