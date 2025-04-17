import { getUserLocale } from '@website/services'
import { getPublic } from '@website/utils/ofetch'

export default async (type: 'blog', ids: Array<string>) => {
	const { locale } = await getUserLocale()

	const mds = await Promise.all(
		ids.map(id => getPublic(`/${type}/${id}/${locale}.mdx`, { parseResponse: txt => txt }))
	)

	return mds as Array<string>
}
