import { useInsertionEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default () => {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()

	useInsertionEffect(() => {
		$t = t
		$navigate = navigate
	}, [t, i18n, navigate])
}
