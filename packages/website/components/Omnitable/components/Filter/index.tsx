import { useMemoizedFn } from 'ahooks'
import { Button, Form, Popover, Select } from 'antd'
import { useLayoutEffect, useMemo } from 'react'
import { deepEqual } from 'stk/react'

import { DndContext } from '@dnd-kit/core'
import { verticalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { FunnelSimple } from '@phosphor-icons/react'
import { $ } from '@website/utils'

import { filter_expressions, filter_relation_options } from '../../metadata'
import FilterItem from './Item'

import type { IPropsFilter } from '../../types'

const { useForm, List } = Form

const Index = (props: IPropsFilter) => {
	const { filter_columns, filter_relation, filter_params, onChangeFilter } = props
	const [form] = useForm()
	const counts = filter_params.length
	const { setFieldsValue, getFieldsValue } = form

	const { default_option, filter_field_options } = useMemo(() => {
		const default_column = filter_columns[0]

		return {
			default_option: {
				field: default_column.bind,
				expression: filter_expressions[default_column.datatype][0]
			} as IPropsFilter['filter_params'][number],
			filter_field_options: filter_columns.map(item => ({ label: item.name, value: item.bind }))
		}
	}, [filter_columns])

	useLayoutEffect(() => {
		const item = { items: filter_params || [] }
		const form_values = getFieldsValue()

		if (deepEqual(item, form_values)) return

		setFieldsValue(item)
	}, [filter_params])

	const onReset = useMemoizedFn(() => onChangeFilter({ filter_params: [] }))

	const onValuesChange = useMemoizedFn(() => {
		const form_values = getFieldsValue()
		const items = (form_values.items as IPropsFilter['filter_params']).filter(item => item)

		if (!items.length) return onReset()

		if (items.every(item => item.field && item.expression)) {
			items.map(item => {
				const column = filter_columns.find(it => it.bind === item.field)!
				const expressions = filter_expressions[column.datatype]

				if (!expressions.includes(item.expression)) {
					item['expression'] = expressions[0]
				}
			})

			onChangeFilter({ filter_params: items })
		}
	})

	const onChangeRelation = useMemoizedFn(v => {
		onChangeFilter({ filter_relation: v })
	})

	const Content = (
		<div className='popover_wrap filter_popover flex flex_column'>
			<span className='title'>{counts ? 'Filters' : 'No filters applied'}</span>

			<div className='w_100 flex'>
				{counts > 0 && (
					<div className='relation_wrap flex flex_column'>
						<span className='relation_item flex justify_center align_center'>where</span>
						{counts > 1 && (
							<span className='relation_item'>
								<Select
									className='w_100'
									options={filter_relation_options}
									value={filter_relation}
									onChange={onChangeRelation}
								></Select>
							</span>
						)}
						{counts > 2 &&
							Array.from({ length: counts - 2 }).map((_, index) => (
								<span
									className='relation_item  flex justify_center align_center'
									key={index}
								>
									{filter_relation}
								</span>
							))}
					</div>
				)}
				<Form
					className='flex align_center'
					form={form}
					onValuesChange={onValuesChange}
					onFieldsChange={fields => {
						if (!fields[0]) return

						const name_path = fields[0]?.name

						if (name_path?.length !== 3) return

						if (name_path.at(0) === 'items' && name_path.at(-1) === 'field') {
							const index = name_path[1]
							const form_values = getFieldsValue()
							const items = form_values.items as IPropsFilter['filter_params']

							delete items[index]['value']

							onChangeFilter({ filter_params: items })
						}
					}}
				>
					<List name='items'>
						{(items, { add, remove, move }) => (
							<div className='form_list_wrap w_100 flex flex_column'>
								<div className='form_list_items w_100 flex flex_column'>
									{items.length ? (
										<DndContext
											onDragEnd={({ active, over }) => {
												if (!over) return

												move(active.id as number, over.id as number)
											}}
										>
											<SortableContext
												items={items.map(item => ({
													...item,
													id: item.name
												}))}
												strategy={verticalListSortingStrategy}
											>
												{items.map((args, index) => (
													<FilterItem
														filter_columns={filter_columns}
														filter_field_options={
															filter_field_options
														}
														filter_param={
															filter_params[args.name] ||
															default_option
														}
														remove={remove}
														{...args}
														key={args.key}
													></FilterItem>
												))}
											</SortableContext>
										</DndContext>
									) : (
										<div className='desc'>Add filters to refine your rows.</div>
									)}
								</div>
								<div
									className={$.cx(
										'form_list_actions flex',
										items.length > 0 && 'has_items'
									)}
								>
									<Button
										className='clickable'
										type='primary'
										onClick={() => add(default_option)}
									>
										Add filter
									</Button>
									{counts > 0 && (
										<Button className='clickable' onClick={onReset}>
											Reset filters
										</Button>
									)}
								</div>
							</div>
						)}
					</List>
				</Form>
			</div>
		</div>
	)

	return (
		<Popover trigger={['click']} placement='bottomLeft' content={Content} forceRender>
			<div>
				<button className='header_btn_wrap border_box flex align_center clickable'>
					<FunnelSimple className='icon'></FunnelSimple>
					<span className='label'>Filter</span>
					{counts > 0 && <span className='counts flex align_center'>{counts}</span>}
				</button>
			</div>
		</Popover>
	)
}

export default $.memo(Index)
