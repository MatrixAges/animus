import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import { LLM } from '@/components'
import { PlusIcon, PulseIcon } from '@phosphor-icons/react'

import Item from './Item'

import styles from './index.module.css'

import type { Links, Provider } from 'fst/llm'
import type { JSONSchema7 } from 'json-schema'

const { Item: FormItem, useForm } = Form
const { Password } = Input

interface IProps {
	name: string
	links: Links
	schema: JSONSchema7
	config: Provider
}

const Index = (props: IProps) => {
	const { name, links, schema, config } = props
	const { t } = useTranslation()
	const [form] = useForm()
	const properties = schema?.properties!

	if (!properties) return null

	return (
		<Form className={$cx(styles._local, 'relative')} layout='vertical' form={form}>
			<div className='form_header flex justify_between align_center'>
				<span className='name'>{name}</span>
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
				<div className='form_header flex justify_between align_center'>
					<span className='name'>{t('model') + t('s')}</span>
					<button className='btn flex align_center clickable'>
						<PlusIcon weight='bold'></PlusIcon>
						<span>{t('group')}</span>
					</button>
				</div>
				<div className='group_items w_100 border_box flex flex_column'>
					{config.models.map((group, index) => (
						<div className='group_item w_100 border_box flex flex_column' key={index}>
							<div className='header w_100 border_box flex justify_between align_center'>
								<div className='group flex align_center'>
									<LLM name={group.group}></LLM>
									<span>{group.group}</span>
								</div>
								<button className='btn flex align_center clickable'>
									<PlusIcon weight='bold'></PlusIcon>
									<span>{t('model')}</span>
								</button>
							</div>
							<div className='model_items w_100 border_box flex flex_wrap'>
								{group.items.map(item => {
									return <Item item={item} key={item.id}></Item>
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</Form>
	)
}

export default $app.memo(Index)
