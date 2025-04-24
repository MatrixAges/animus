import { useMemoizedFn } from 'ahooks'
import { Button, Col, ConfigProvider, Form, Row } from 'antd'
import { useLayoutEffect } from 'react'
import { deepEqual } from 'stk/react'

import { $ } from '@website/utils'

import styles from '../index.module.css'
import FormComponent from './FormComponent'

import type { IPropsDetail } from '../types'
const { useForm, Item } = Form

const Index = (props: IPropsDetail) => {
	const { form_columns, modal_type, item, onChange, onClose } = props
	const [form] = useForm()
	const { setFieldsValue, getFieldsValue } = form

	const disabled = modal_type === 'view'

	useLayoutEffect(() => {
		const form_item = getFieldsValue()

		if (deepEqual(item, form_item)) return

		setFieldsValue(item)
	}, [item])

	const onFinish = useMemoizedFn(values => {
		onChange(-1, values)
	})

	return (
		<ConfigProvider
			theme={{
				token: {
					controlHeight: 32,
					controlHeightSM: 32
				}
			}}
		>
			<Form className={styles.Detail} form={form} layout='vertical' disabled={disabled} onFinish={onFinish}>
				<Row gutter={12} wrap>
					{form_columns.map((col, index) => (
						<Col span={col.span || 12} key={index}>
							<Item label={col.name} name={col.bind}>
								<FormComponent
									column={col}
									disabled={disabled || col.readonly}
								></FormComponent>
							</Item>
						</Col>
					))}
				</Row>
				{modal_type === 'edit' && (
					<div className='actions_wrap w_100 border_box flex justify_end sticky bottom_0'>
						<Button onClick={onClose}>Cancel</Button>
						<Button type='primary' htmlType='submit'>
							Save
						</Button>
					</div>
				)}
			</Form>
		</ConfigProvider>
	)
}

export default $.memo(Index)
