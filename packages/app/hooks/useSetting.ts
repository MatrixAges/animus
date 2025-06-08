import { useLayoutEffect, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { local } from 'stk/storage'

export default <K extends string>(keys: Array<K>) => {
	const [setting, setSetting] = useState<Record<K, any>>()

	useLayoutEffect(() => {
		const offs = keys.map(key => {
			return local.on(key, v => {
				return setSetting(setting => ({ ...setting, [key]: v }) as Record<K, any>)
			})
		})

		return () => offs.forEach(off => off())
	}, [keys])

	const onValuesChange = useMemoizedFn((values: Record<K, any>) => {
		setSetting({ ...setting, ...values })

		Object.keys(values).forEach(key => {
			const value = values[key as K]

			local.setItem(key, value)
		})
	})

	return { setting, onValuesChange }
}
