import { useLayoutEffect } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Form } from 'antd'
import { observer } from 'mobx-react-lite'

import { useGlobal } from '@/context'

import { Preferences, Update } from './components'

const { useForm } = Form

const Index = () => {
	const global = useGlobal()
	const [form] = useForm()
	const { setFieldsValue } = form

	useLayoutEffect(() => {
		setFieldsValue({
			lang: global.setting.lang,
			theme: global.setting.theme,
			glass: global.setting.glass
		})
	}, [])

	const onValuesChange = useMemoizedFn(v => {
		if ('lang' in v) global.setting.setLang(v.lang)
		if ('theme' in v) global.setting.setTheme(v.theme)
		if ('glass' in v) global.setting.setGlass(v.glass)
	})

	return (
		<Form className='w_100 flex flex_column' form={form} onValuesChange={onValuesChange}>
			<Preferences></Preferences>
			<Update></Update>
		</Form>
	)
}

export default new window.$app.handle(Index).by(observer).by(window.$app.memo).get()
