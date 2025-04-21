import { useTranslations } from 'next-intl'

import blogs from '../appmeta/blog'

export const landing_blog = blogs[0].id

export const useMenu = () => {
	const t = useTranslations('blog')

	return blogs.map(item => ({
		...item,
		title: t(`blogs.${item.id}`)
	}))
}
