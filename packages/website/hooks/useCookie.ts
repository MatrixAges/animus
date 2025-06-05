import { useEffect, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import Cookies from 'js-cookie'

import { is_server } from '@website/utils/const'

export default (key: string, default_value?: string) => {
	const [value, setValue] = useState(() => default_value)

	useEffect(() => {
		if (is_server) return

		setValue(Cookies.get(key))

		const changeValue = (e: any) => {
			const changed = e.changed

			changed.forEach((item: Cookie) => {
				if (item.name === key) {
					setValue(item.value)
				}
			})
		}

		if (typeof cookieStore !== 'undefined') {
			cookieStore.addEventListener('change', changeValue)

			return () => cookieStore.removeEventListener('change', changeValue)
		}
	}, [])

	const setCookie = useMemoizedFn((v: string) => {
		setValue(v)
		Cookies.set(key, v)
	})

	return [value, setCookie] as const
}
