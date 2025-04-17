import { getRequestConfig } from 'next-intl/server'

import { getUserLocale } from './services'

export default getRequestConfig(async () => {
	const { locale } = await getUserLocale()

	return {
		locale,
		messages: {
			common: (await import(`./locales/common/index.json`)).default,
			global: (await import(`./locales/${locale}/global.json`)).default,
			layout: (await import(`./locales/${locale}/layout.json`)).default,
			index: (await import(`./locales/${locale}/index.json`)).default
		}
	}
})
