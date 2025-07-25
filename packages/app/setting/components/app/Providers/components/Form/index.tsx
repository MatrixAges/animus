import { useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Form, Input } from 'antd'
import { debounce } from 'es-toolkit/compat'
import { providers } from 'fst/llm'
import { useTranslation } from 'react-i18next'

import { Empty } from '@/components'
import { confirm } from '@/utils'
import { ArrowCounterClockwiseIcon, PlusIcon, PulseIcon } from '@phosphor-icons/react'

import GroupItem from './GroupItem'

import styles from './index.module.css'

import type { Provider as ProviderModel } from '@/models'
import type { Links, Provider, ProviderKey } from 'fst/llm'
import type { JSONSchema7 } from 'json-schema'

const { Item: FormItem, List, useForm, useWatch } = Form
const { Password } = Input

interface IProps {
	id: ProviderKey
	name: string
	schema: JSONSchema7
	links: Links
	config: Provider
	setProvider: ProviderModel['setProvider']
}

const Index = (props: IProps) => {
	const { id, name, links, schema, config, setProvider } = props
	const { t } = useTranslation()
	const [form] = useForm<Provider>()
	const models = useWatch('models', form) || []
	const { getFieldValue, setFieldsValue, getFieldsValue } = form
	const properties = schema?.properties!

	useEffect(() => {
		setFieldsValue(config)
	}, [config])

	const onValuesChange = useMemoizedFn(
		debounce((_, values) => {
			setProvider(id, { config: values })
		}, 450)
	)

	const onReset = useMemoizedFn(async () => {
		const res = await confirm({ title: t('notice'), content: t('reset_confirm'), zIndex: 1000000 })

		if (!res) return

		setFieldsValue(providers[id].config)
		setProvider(id, { config: getFieldsValue() })
	})

	return (
		<Form
			className={$cx(styles._local, 'relative')}
			layout='vertical'
			clearOnDestroy
			form={form}
			onValuesChange={onValuesChange}
		>
			<div className='form_header head flex justify_between align_center'>
				<div className='left_wrap flex align_center'>
					<span className='name'>{name}</span>
					<If condition={id in providers}>
						<button
							className='btn_remove btn none flex align_center clickable'
							onClick={onReset}
						>
							<ArrowCounterClockwiseIcon
								weight='bold'
								size={10}
							></ArrowCounterClockwiseIcon>
							<span>{t('reset')}</span>
						</button>
					</If>
				</div>
				<div className='link_items flex align_center'>
					{(['website', 'doc', 'model_spec', 'api_key'] as const).map(i => (
						<a
							className='link_item flex justify_center align_center clickable'
							target='_blank'
							href={links[i]}
							key={i}
						>
							{t(`setting.providers.links.${i}`)}
						</a>
					))}
				</div>
			</div>
			<div className='form_body w_100 border_box'>
				<If condition={properties?.api_base_url as string}>
					<div className='row_item w_100 flex flex_column'>
						<span className='title'>{t('setting.providers.api_base_url')}</span>
						<FormItem name='api_base_url' noStyle>
							<Input placeholder={t('setting.providers.api_base_url_placeholder')}></Input>
						</FormItem>
					</div>
				</If>
				<div className='row_item w_100 flex flex_column'>
					<div className='flex justify_between align_center'>
						<span className='title'>{t('setting.providers.api_key')}</span>
						<button className='btn flex align_center clickable'>
							<PulseIcon weight='bold'></PulseIcon>
							<span>{t('inspect')}</span>
						</button>
					</div>
					<FormItem name='api_key' noStyle>
						<Password placeholder={t('setting.providers.api_key_placeholder')}></Password>
					</FormItem>
				</div>
				<List name='models'>
					{(group_items, { add, remove }) => (
						<div className='w_100 flex flex_column'>
							<div className='form_header models flex justify_between align_center'>
								<span className='name'>{t('model') + t('s')}</span>
								<button
									className='btn flex align_center clickable'
									onClick={() =>
										add({
											group: `Group ${models.length + 1}`,
											items: []
										})
									}
								>
									<PlusIcon weight='bold'></PlusIcon>
									<span>{t('group')}</span>
								</button>
							</div>
							<Choose>
								<When condition={group_items.length}>
									<div className='group_items w_100 border_box flex flex_column'>
										{group_items.map(({ key, name: group_index }, index) => {
											const group = getFieldValue('models')[
												index
											] as Provider['models'][number]

											return (
												<GroupItem
													group={group}
													group_index={group_index}
													removeGroup={remove}
													key={key}
												></GroupItem>
											)
										})}
									</div>
								</When>
								<Otherwise>
									<div className='empty_wrap w_100 flex justify_center align_center'>
										<Empty></Empty>
									</div>
								</Otherwise>
							</Choose>
						</div>
					)}
				</List>
			</div>
		</Form>
	)
}

export default $app.memo(Index)
