import { useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Form, Input } from 'antd'
import { omit } from 'es-toolkit'
import { debounce } from 'es-toolkit/compat'
import { providers } from 'fst/llm'
import { useTranslation } from 'react-i18next'

import { Empty } from '@/components'
import { confirm } from '@/utils'
import { ArrowCounterClockwiseIcon, PencilSimpleIcon, PlusIcon, PulseIcon, TrashIcon } from '@phosphor-icons/react'

import GroupItem from './GroupItem'

import styles from './index.module.css'

import type { Provider } from 'fst/llm'
import type { IPropsForm } from '../../types'

const { Item: FormItem, List, useForm, useWatch } = Form
const { Password } = Input

const Index = (props: IPropsForm) => {
	const { id, name, links, schema, config, setProvider, onEditProvider, removeProvider } = props
	const { t } = useTranslation()
	const [form] = useForm<Provider>()
	const models = useWatch('models', form) || []
	const { getFieldValue, setFieldsValue, getFieldsValue } = form
	const properties = schema?.properties!
	const extra_properties = omit(properties, ['enabled', 'api_key', 'api_base_url', 'models'])

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

	const onEdit = useMemoizedFn(() => onEditProvider(id))
	const onRemove = useMemoizedFn(() => removeProvider(id))

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
					<Choose>
						<When condition={id in providers}>
							<button
								className='btn_head btn none flex align_center clickable'
								onClick={onReset}
							>
								<ArrowCounterClockwiseIcon
									weight='bold'
									size={10}
								></ArrowCounterClockwiseIcon>
								<span>{t('reset')}</span>
							</button>
						</When>
						<Otherwise>
							<div className='btn_head none align_center'>
								<button
									className='btn flex align_center clickable mr_6'
									onClick={onEdit}
								>
									<PencilSimpleIcon weight='bold' size={10}></PencilSimpleIcon>
									<span>{t('edit')}</span>
								</button>
								<button className='btn flex align_center clickable' onClick={onRemove}>
									<TrashIcon weight='bold' size={10}></TrashIcon>
									<span>{t('remove')}</span>
								</button>
							</div>
						</Otherwise>
					</Choose>
				</div>
				<div className='link_items flex align_center'>
					{(['website', 'doc', 'model_spec', 'api_key'] as const).map(i => (
						<a
							className={$cx(
								'link_item flex justify_center align_center clickable',
								!links[i] && 'disabled'
							)}
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
				<If condition={properties?.api_key as string}>
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
				</If>
				<If condition={Object.keys(extra_properties).length}>
					{Object.keys(extra_properties).map(key => (
						<div className='row_item w_100 flex flex_column' key={key}>
							<span className='title'>{key}</span>
							<FormItem name={key} noStyle>
								<Input placeholder={t('input') + t('b') + key}></Input>
							</FormItem>
						</div>
					))}
				</If>
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
