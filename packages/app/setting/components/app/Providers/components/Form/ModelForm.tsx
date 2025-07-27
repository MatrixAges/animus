import { useMemoizedFn } from 'ahooks'
import { Button, Form, Input, Switch } from 'antd'
import Color from 'color'
import { features_metadata } from 'fst/llm'
import { useTranslation } from 'react-i18next'

import { Icon, LLM } from '@/components'
import { useDelegate } from '@/hooks'
import { TrashIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { FeaturesKey, Model, Provider } from 'fst/llm'
import type { IPropsFormFeatures, IPropsFormModelForm } from '../../types'

const { Item, useForm, useWatch } = Form

const Features = $app.memo((props: IPropsFormFeatures) => {
	const { value = {}, onChange } = props
	const { t } = useTranslation()

	const ref = useDelegate((v: FeaturesKey) => {
		value[v] = !value[v]

		onChange?.({ ...value })
	})

	return (
		<div className='features flex flex_wrap w_100 border_box' ref={ref}>
			{Object.keys(features_metadata!).map(key => {
				const feature = features_metadata[key as FeaturesKey]
				const { icon, color } = feature

				return (
					<div
						className={$cx(
							'feature border_box flex align_center clickit',
							value[key as FeaturesKey] && 'enabled'
						)}
						style={{ '--color': Color(color).rgb().array().join(',') }}
						data-key={key}
						key={key}
					>
						<div className='icon_wrap flex justify_center align_center transition_normal'>
							<Icon id={icon}></Icon>
						</div>
						<span className='name transition_normal'>
							{t(`setting.providers.features.${key as FeaturesKey}`)}
						</span>
					</div>
				)
			})}
		</div>
	)
})

const Index = (props: IPropsFormModelForm) => {
	const { item, group_index, model_index, onRemove, getFieldValue, setFieldValue, onClose } = props
	const { t } = useTranslation()
	const [form] = useForm<Model>()
	const name = useWatch('name', form) || ''

	const onFinish = useMemoizedFn((model: Model) => {
		const groups = getFieldValue('models') as Provider['models']

		let exist_item_index = -1

		groups.forEach(group => {
			exist_item_index = group.items.findIndex(item => item.id === model.id)
		})

		if (exist_item_index !== -1 && exist_item_index !== model_index) {
			return $message.error(t('setting.providers.model_exist'), 0)
		}

		setFieldValue(['models', group_index, 'items', model_index], model)

		onClose()
	})

	return (
		<Form
			className={$cx('w_100', styles.model_form)}
			layout='vertical'
			form={form}
			initialValues={item}
			onFinish={onFinish}
		>
			<div className='header_wrap w_100 border_box flex justify_between align_center'>
				<div className='left_wrap flex align_center'>
					<LLM name={name}></LLM>
					<span className='name'>{name}</span>
				</div>
				<Item name='enabled' noStyle>
					<Switch size='small'></Switch>
				</Item>
			</div>
			<div className='body_wrap w_100 border_box flex flex_column'>
				<Item name='id' label='Model ID'>
					<Input placeholder='Model ID'></Input>
				</Item>
				<Item name='name' label='Model Name'>
					<Input placeholder='Model name'></Input>
				</Item>
				<Item name='features' label='Features' style={{ marginBottom: 0 }}>
					<Features></Features>
				</Item>
			</div>
			<div className='footer_wrap flex'>
				<Button
					className='btn_remove flex justify_center align_center'
					htmlType='button'
					onClick={onRemove}
				>
					<TrashIcon></TrashIcon>
				</Button>
				<Button onClick={onClose}>{t('cancel')}</Button>
				<Button type='primary' htmlType='submit'>
					{t('save')}
				</Button>
			</div>
		</Form>
	)
}

export default $app.memo(Index)
