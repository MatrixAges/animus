import { useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Form } from 'antd'
import { debounce } from 'es-toolkit/compat'
import { useTranslation } from 'react-i18next'

import { ModelSelect } from '@/components'

import styles from './index.module.css'

import type { IPropsPrompt } from '../../types'

const { useForm, Item } = Form

const Index = (props: IPropsPrompt) => {
	const { prompts, setPrompts } = props
	const [form] = useForm()
	const { t } = useTranslation()

	const { setFieldsValue } = form

	const onValuesChange = useMemoizedFn(
		debounce((_, values) => {
			setPrompts(values)
		}, 450)
	)

	useEffect(() => {
		setFieldsValue(prompts)
	}, [prompts])

	return (
		<Form
			className={$cx('w_100 border_box flex flex_column', styles._local)}
			form={form}
			onValuesChange={onValuesChange}
		>
			<div className='prompt_item border_box flex flex_column'>
				<span className='title'>{t('naming')}</span>
				<Item name={['naming', 'model']} noStyle>
					<ModelSelect allowClear></ModelSelect>
				</Item>
				<div className='textarea_wrap w_100 flex'>
					<Item name={['naming', 'prompt']} noStyle>
						<textarea className='textarea w_100 border_box'></textarea>
					</Item>
				</div>
			</div>
			<div className='prompt_item border_box flex flex_column'>
				<span className='title'>{t('translate')}</span>
				<Item name={['translate', 'model']} noStyle>
					<ModelSelect allowClear></ModelSelect>
				</Item>
				<div className='textarea_wrap w_100 flex'>
					<Item name={['translate', 'prompt']} noStyle>
						<textarea className='textarea w_100 border_box'></textarea>
					</Item>
				</div>
			</div>
		</Form>
	)
}

export default $app.memo(Index)
