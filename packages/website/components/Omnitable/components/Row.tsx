import { useMemoizedFn } from 'ahooks'
import { Form } from 'antd'
import { pick } from 'lodash-es'
import { useLayoutEffect } from 'react'
import { deepEqual } from 'stk/react'

import { $ } from '@website/utils'

import Column from './Col'

import type { IPropsRow } from '../types'
import type { FormProps } from 'antd'

const { useForm } = Form

const Index = (props: IPropsRow) => {
	const { table_columns, modal_index, item, index, editing_info, setEditingInfo, onChange } = props
	const [form] = useForm()
	const { setFieldsValue, getFieldsValue } = form

	const setEditingField = useMemoizedFn((args: { field: string; focus: boolean } | null) => {
		setEditingInfo(args ? { row_index: index, field: args.field, focus: args.focus } : null)
	})

	useLayoutEffect(() => {
		const form_item = getFieldsValue()

		if (deepEqual(item, form_item)) return

		setFieldsValue(item)
	}, [item])

	const onValuesChange: FormProps['onValuesChange'] = useMemoizedFn(v => {
		onChange(index, v)
		setEditingField(null)
	})

	return (
		<Form form={form} component={false} onValuesChange={onValuesChange}>
			<tr
				className={$.cx(
					'form_table_tr',
					modal_index === index + 1 && 'selected_prev',
					modal_index === index && 'selected'
				)}
			>
				{table_columns.map(col => (
					<Column
						column={col}
						value={pick(item, col.bind)[col.bind]}
						row_index={index}
						focus={!col.readonly && editing_info && col.bind === editing_info.field}
						setEditingField={col.readonly ? undefined : setEditingField}
						key={col.name}
					></Column>
				))}
			</tr>
		</Form>
	)
}

export default $.memo(Index)
