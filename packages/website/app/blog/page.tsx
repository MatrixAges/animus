'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { useMenu } from '@website/appdata/blog'
import { $ } from '@website/utils'

import styles from './page.module.css'

const Index = () => {
	const t = useTranslations('blog')
	const menu = useMenu()

	return (
		<div className={$.cx('small_container_wrap border_box flex flex_column align_center', styles._local)}>
			<div className='header_wrap flex flex_column align_center'>
				<h1 className='title'>{t('title')}</h1>
				<h2 className='desc'>{t('desc')}</h2>
			</div>
			<div className='w_100 blog_items flex flex_column'>
				{menu.map((item, index) => (
					<Link
						className='w_100 blog_item flex justify_between'
						href={`/blog/${item.id}`}
						key={index}
					>
						<span className='title'>{item.title}</span>
						<span className='date'>{item.date}</span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Index
