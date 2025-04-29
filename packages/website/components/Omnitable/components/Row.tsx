import { useMemoizedFn } from 'ahooks'
import { Form } from 'antd'
import { get } from 'lodash-es'
import { useLayoutEffect } from 'react'
import { deepEqual } from 'stk/react'

import { $ } from '@website/utils'

import Column from './Col'

import type { IPropsRow } from '../types'
import type { FormProps } from 'antd'

const { useForm } = Form

const Index = (props: IPropsRow) => {
	const { table_columns, modal_index, item, index, editing_info, setEditingInfo, onChange, onToggleGroupItems } =
		props
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
				{table_columns.map(col => {
					const is_group_row =
						(col.bind === item['__group_field__'] && col.name === item['__group_name__']) ||
						col.name === item['__group_replace__']?.name

					const group_info =
						is_group_row && !item['__group_bottom__']
							? {
									group_id: item['__group_id__'],
									group_visible_self: item['__group_visible_self__'],
									group_visible_children: item['__group_visible_children__']
								}
							: undefined

					const group_level =
						(col.name === item['__group_name__'] ||
							col.name === item['__group_replace__']?.name) &&
						item['__group_level__']
							? item['__group_level__']
							: undefined

					return (
						<Column
							column={col}
							value={get(item, col.bind)}
							group_replace={
								item['__group_replace__'] && item['__group_replace__'].name === col.name
									? item['__group_replace__'].value
									: undefined
							}
							row_index={index}
							focus={!col.readonly && editing_info && col.bind === editing_info.field}
							item={col.type === 'text' && col.props?.format ? item : undefined}
							group_info={group_info}
							group_level={group_level}
							setEditingField={col.readonly ? undefined : setEditingField}
							onToggleGroupItems={is_group_row ? onToggleGroupItems : undefined}
							key={col.name}
						></Column>
					)
				})}
			</tr>
		</Form>
	)
}

export default $.memo(Index)
