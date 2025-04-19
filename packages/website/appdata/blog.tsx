import { useTranslations } from 'next-intl'

export const blogs = [
	{
		id: 'why_animus',
		date: '2025-04-20'
	}
]

export const landing_blog = blogs[0].id

export const useMenu = () => {
	const t = useTranslations('blog')

	return blogs.map(item => ({
		...item,
		title: t(`blogs.${item.id}`)
	}))
}
