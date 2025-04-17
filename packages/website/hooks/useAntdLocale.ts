import en from 'antd/locale/en_US'
import { useEffect, useState } from 'react'

import type { App } from '@website/types'

export default (lang: App.Locales) => {
	const [locale, setLocale] = useState(en)

	useEffect(() => {
		import(`../locales/antd/${lang}`).then(l => setLocale(l.default))
	}, [lang])

	return locale
}
