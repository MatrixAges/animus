import { Form } from 'antd'

import { PlusIcon } from '@phosphor-icons/react'

import LazyItem from './LazyItem'

import styles from './index.module.css'

import type { JSONSchema7 } from 'json-schema'

const { Item, useForm } = Form

interface IProps {
	root_name?: string
	schema: JSONSchema7
}

const Index = $app.memo((props: IProps & { name?: string }) => {
	const { root_name, schema, name } = props
	const properties = schema.properties!

	if (schema.type === 'object') {
		if (schema.properties) {
			return Object.keys(properties).map((key, index) => (
				<Index
					root_name={root_name}
					schema={properties[key] as JSONSchema7}
					name={key}
					key={index}
				></Index>
			))
		}

		if (schema.propertyNames && schema.additionalProperties) {
			return (
				<div className='w_100 border_box flex flex_column'>
					<div className='header_wrap flex justify_between align_center'>
						<span className='name'>
							{(schema.propertyNames as JSONSchema7 & { name: string }).name}
						</span>
						<div className='btn_add flex justify_center align_center'>
							<PlusIcon></PlusIcon>
						</div>
					</div>
					<Index
						schema={schema.propertyNames as JSONSchema7}
						name={(schema.propertyNames as JSONSchema7 & { name: string }).name}
					></Index>
					<div className='items_wrap w_100 border_box'>
						<Index schema={schema.additionalProperties as JSONSchema7}></Index>
					</div>
				</div>
			)
		}
	}

	if (schema.type === 'array') {
		return (
			<div className='w_100 border_box flex flex_column'>
				<div className='header_wrap flex justify_between align_center'>
					<span className='name'>items</span>
					<div className='btn_add flex justify_center align_center'>
						<PlusIcon></PlusIcon>
					</div>
				</div>
				<div className='items_wrap w_100 border_box'>
					<Index schema={schema.items! as JSONSchema7}></Index>
				</div>
			</div>
		)
	}

	if (name === 'enabled') {
		return (
			<Item className='enabled_item absolute' name={name}>
				<LazyItem type={schema.type as string}></LazyItem>
			</Item>
		)
	}

	return (
		<Item name={name} label={name}>
			<LazyItem type={schema.type as string}></LazyItem>
		</Item>
	)
})

const Render = (props: IProps) => {
	const { root_name, schema } = props
	const [form] = useForm()

	return (
		<Form className={$cx(styles._local, 'relative')} layout='vertical' form={form}>
			<div className='form_header flex justify_between align_center'>
				<span className='root_name'>{root_name}</span>
			</div>
			<div className='form_body w_100 border_box'>
				<Index root_name={root_name} schema={schema}></Index>
			</div>
		</Form>
	)
}

export default $app.memo(Render)
