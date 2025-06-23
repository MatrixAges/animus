import { useInsertionEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default () => {
	const { t, i18n } = useTranslation()

	useInsertionEffect(() => {
		$t = t
	}, [t, i18n])
}
