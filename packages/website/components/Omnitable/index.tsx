'use client'

import '@website/appdata/mobx'

import { useMemoizedFn } from 'ahooks'
import { App, Button } from 'antd'
import { debounce } from 'lodash-es'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect, useState } from 'react'
import { container } from 'tsyringe'

import { Eyes, Plus } from '@phosphor-icons/react'
import { Drawer } from '@website/components'
import { $ } from '@website/utils'

import { Detail, Fields, Filter, Pagination, Sort, Table, View } from './components'
import styles from './index.module.css'
import Model from './model'

import type {
	Omnitable,
	IPropsSort,
	IPropsFilter,
	IPropsFields,
	IPropsTable,
	IPropsPagination,
	IPropsDetail,
	IPropsView
} from './types'
const { useApp } = App

const Index = (props: Omnitable.Props) => {
	const [x] = useState(() => container.resolve(Model))
	const antd = useApp()
	const filter_columns = $.copy(x.filter_columns)

	useLayoutEffect(() => {
		x.init({ props, antd })

		return () => x.off()
	}, [props, antd])

	const props_sort: IPropsSort = {
		sort_field_options: $.copy(x.sort_field_options),
		sort_params: $.copy(x.sort_params),
		onChangeSort: x.onChangeSort
	}

	const props_filter: IPropsFilter = {
		filter_columns,
		filter_relation: x.filter_relation,
		filter_params: $.copy(x.filter_params),
		onChangeFilter: useMemoizedFn(debounce(x.onChangeFilter, 300))
	}

	const props_fields: IPropsFields = {
		visible_columns: $.copy(x.visible_columns),
		onChangeVisibleColumns: useMemoizedFn(v => {
			x.visible_columns = v

			x.clearApplyView()
		})
	}

	const props_table: IPropsTable = {
		primary: x.primary,
		table_columns: $.copy(
			x.visible_columns
				.map(item => {
					const column = x.table_columns.find(c => c.bind === item.id)!

					return item.visible ? column : null
				})
				.filter(item => item !== null)
		),
		data: $.copy(x.list ? x.list.data : []),
		sort_params: $.copy(x.sort_params),
		editing_info: $.copy(x.editing_info),
		modal_index: x.modal_index,
		onSort: x.onSort,
		onChange: x.onChange,
		setEditingInfo: useMemoizedFn(v => (x.editing_info = v))
	}

	const props_pagination: IPropsPagination = {
		pagination: $.copy(x.pagination),
		onChangePagination: x.onChangePagination
	}

	const props_detail: IPropsDetail = {
		form_columns: $.copy(x.form_columns),
		modal_type: x.modal_type,
		item: $.copy(x.list!.data?.at(x.modal_index)),
		loading: x.loading,
		onSubmit: x.onSubmit,
		onClose: useMemoizedFn(() => {
			x.modal_visible = false
			x.modal_index = -2
		})
	}

	const props_view: IPropsView = {
		filter_columns,
		views: $.copy(x.views),
		getSortFieldOptions: x.getSortFieldOptions,
		onApplyView: x.onApplyView,
		onChangeViews: useMemoizedFn(v => (x.views = v))
	}

	const onToggleView = useMemoizedFn(() => (x.modal_view_visible = !x.modal_view_visible))

	const onCreate = useMemoizedFn(() => {
		x.modal_type = 'add'
		x.modal_visible = true
	})

	return (
		<div className={$.cx(styles._local)}>
			<div className={$.cx('header_wrap w_100 flex flex_wrap justify_between', styles.header_wrap)}>
				<div className='flex'>
					<button
						className='header_btn_wrap border_box flex align_center clickable mr_8'
						onClick={onToggleView}
					>
						<Eyes className='icon'></Eyes>
						<span className='label'>View</span>
						{x.apply_view_name && (
							<span className='counts flex align_center'>{x.apply_view_name}</span>
						)}
					</button>
					<Sort {...props_sort}></Sort>
					{x.filter_columns.length > 0 && <Filter {...props_filter}></Filter>}
				</div>
				<div className='flex'>
					<Fields {...props_fields}></Fields>
					<Button
						className='flex justify_center align_center clickable ml_8'
						type='primary'
						onClick={onCreate}
					>
						<Plus className='icon' weight='bold'></Plus>
						<span>Create</span>
					</Button>
				</div>
			</div>
			<Table {...props_table}></Table>
			<Pagination {...props_pagination}></Pagination>
			<Drawer
				className={styles.Drawer}
				open={x.modal_visible || x.modal_view_visible}
				title={
					x.modal_view_visible
						? 'Table views'
						: x.modal_type === 'add'
							? 'Create'
							: props_detail.item?.[x.primary]
				}
				width={x.modal_view_visible ? 'min(90vw,660px)' : 'min(100vw,450px)'}
				placement={x.modal_view_visible ? 'left' : 'right'}
				maskClosable={x.modal_type === 'view' || x.modal_view_visible}
				disablePadding={x.modal_visible}
				onCancel={x.modal_view_visible ? onToggleView : props_detail.onClose}
				header_actions={
					x.modal_view_visible && (
						<button
							className='btn_add_view flex justify_center align_center absolute clickable'
							onClick={x.onAddView}
						>
							<Plus className='icon' weight='bold'></Plus>
							<span>Add</span>
						</button>
					)
				}
			>
				{x.modal_view_visible ? <View {...props_view}></View> : <Detail {...props_detail}></Detail>}
			</Drawer>
		</div>
	)
}

export default $.memo(observer(Index))
