import { useMemoizedFn } from 'ahooks'
import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import styles from './index.module.css'

import type { IPropsMutateProviderForm } from '../../types'

const { Item, useForm } = Form

type Values = Parameters<IPropsMutateProviderForm['mutateProvider']>[0]

const Index = (props: IPropsMutateProviderForm) => {
	const { mutate_provider_item, mutateProvider } = props
	const [form] = useForm<Values>()
	const { t } = useTranslation()

	const onFinish = useMemoizedFn(v => {
		mutateProvider(v, mutate_provider_item?.name)
	})

	return (
		<Form
			className={$cx('w_100', styles._local)}
			layout='vertical'
			form={form}
			initialValues={mutate_provider_item ?? { website: '', api_key: '', doc: '', model_spec: '' }}
			onFinish={onFinish}
		>
			<Item
				name='name'
				label={t('setting.providers.add_provider_modal.provider_name')}
				rules={[{ required: true }]}
			>
				<Input
					placeholder={`${t('input')}${t('b')}${t('a')}${t('b')}${t('unique')}${t('b')}${t('setting.providers.add_provider_modal.provider_name').toLowerCase()}`}
				></Input>
			</Item>
			<div className='links_wrap w_100 flex flex_wrap'>
				<Item name='website' label={t('setting.providers.links.website')}>
					<Input
						placeholder={`${t('input')}${t('b')}${t('setting.providers.add_provider_modal.link_to')}${t('b')}${t('setting.providers.links.website').toLowerCase()}`}
					></Input>
				</Item>
				<Item name='doc' label={t('setting.providers.links.doc')}>
					<Input
						placeholder={`${t('input')}${t('b')}${t('setting.providers.add_provider_modal.link_to')}${t('b')}${t('setting.providers.links.doc').toLowerCase()}`}
					></Input>
				</Item>
				<Item name='model_spec' label={t('setting.providers.links.model_spec')}>
					<Input
						placeholder={`${t('input')}${t('b')}${t('setting.providers.add_provider_modal.link_to')}${t('b')}${t('setting.providers.links.model_spec').toLowerCase()}`}
					></Input>
				</Item>
				<Item name='api_key' label={t('setting.providers.links.api_key')}>
					<Input
						placeholder={`${t('input')}${t('b')}${t('setting.providers.add_provider_modal.link_to')}${t('b')}${t('setting.providers.links.api_key').toLowerCase()}`}
					></Input>
				</Item>
			</div>

			<div className='btn_wrap w_100 flex justify_end'>
				<Button htmlType='button'>{t('cancel')}</Button>
				<Button type='primary' htmlType='submit'>
					{t('save')}
				</Button>
			</div>
		</Form>
	)
}

export default $app.memo(Index)
