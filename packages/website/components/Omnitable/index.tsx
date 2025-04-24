'use client'

import '@website/appdata/mobx'

import { useMemoizedFn } from 'ahooks'
import { App } from 'antd'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect, useState } from 'react'
import { container } from 'tsyringe'

import { Drawer } from '@website/components'
import { $ } from '@website/utils'

import { Detail, Filter, Pagination, Sort, Table } from './components'
import styles from './index.module.css'
import Model from './model'

import type { Omnitable, IPropsSort, IPropsFilter, IPropsTable, IPropsPagination, IPropsDetail } from './types'

const { useApp } = App

const Index = (config: Omnitable.Config) => {
	const [x] = useState(() => container.resolve(Model))
	const antd = useApp()

	useLayoutEffect(() => {
		x.init({ config, antd })
	}, [config, antd])

	const props_sort: IPropsSort = {
		sort_field_options: $.copy(x.sort_field_options),
		sort_params: $.copy(x.sort_params),
		onChangeSort: x.onChangeSort
	}

	const props_filter: IPropsFilter = {
		filter_columns: $.copy(x.filter_columns),
		filter_relation: x.filter_relation,
		filter_params: $.copy(x.filter_params),
		onChangeFilter: x.onChangeFilter
	}

	const props_table: IPropsTable = {
		primary: x.primary,
		table_columns: $.copy(x.table_columns.filter(item => x.visible_columns.includes(item.name))),
		data: $.copy(x.list ? x.list.data : []),
		sort_params: $.copy(x.sort_params),
		editing_info: $.copy(x.editing_info),
		modal_index: x.modal_index,
		onSort: x.onSort,
		onChange: x.onChange,
		setEditingInfo: useMemoizedFn(v => (x.editing_info = v))
	}

	const props_pagination: IPropsPagination = {}

	const props_detail: IPropsDetail = {
		form_columns: $.copy(x.form_columns),
		modal_type: x.modal_type,
		item: $.copy(x.list!.data[x.modal_index]),
		onChange: x.onChange,
		onClose: useMemoizedFn(() => {
			x.modal_visible = false
			x.modal_index = -2
		})
	}

	return (
		<div className={$.cx(styles._local)}>
			<div className='header_wrap w_100 flex justify_between'>
				<div className='flex'>
					<Sort {...props_sort}></Sort>
					{x.filter_columns.length > 0 && <Filter {...props_filter}></Filter>}
				</div>
			</div>
			<Table {...props_table}></Table>
			<Pagination></Pagination>
			<Drawer
				open={x.modal_visible}
				title={props_detail.item?.[x.primary]}
				width={450}
				placement='right'
				maskClosable={x.modal_type === 'view'}
				disablePadding
				onCancel={props_detail.onClose}
			>
				<Detail {...props_detail}></Detail>
			</Drawer>
		</div>
	)
}

export default $.memo(observer(Index))
