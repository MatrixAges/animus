'use client'

import '@website/appdata/mobx'

import { useMemoizedFn } from 'ahooks'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect, useState } from 'react'
import { container } from 'tsyringe'

import { $ } from '@website/utils'

import { Filter, Pagination, Table } from './components'
import styles from './index.module.css'
import Model from './model'

import type { Omnitable, IPropsFilter, IPropsTable, IPropsPagination } from './types'
const Index = (config: Omnitable.Config) => {
	const [x] = useState(() => container.resolve(Model))

	useLayoutEffect(() => {
		x.init(config)
	}, [config])

	const props_filter: IPropsFilter = {
		filter_columns: $.copy(x.filter_columns)
	}

	const props_table: IPropsTable = {
		table_columns: $.copy(x.table_columns),
		data: $.copy(x.list ? x.list.data : []),
		sort_params: $.copy(x.sort_params),
		editing_info: $.copy(x.editing_info),
		onSort: x.onSort,
		onChange: x.onChange,
		setEditingInfo: useMemoizedFn(v => (x.editing_info = v))
	}

	const props_pagination: IPropsPagination = {}

	return (
		<div className={$.cx(styles._local)}>
			<Filter {...props_filter}></Filter>
			<Table {...props_table}></Table>
			<Pagination></Pagination>
		</div>
	)
}

export default $.memo(observer(Index))
