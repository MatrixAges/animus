import { useMemo } from 'react'

import { $ } from '@website/utils'

import Date from '../fields/Date'
import DatePicker from '../fields/DatePicker'
import HttpCode from '../fields/HttpCode'
import HttpCodeIndicator from '../fields/HttpCodeIndicator'
import Input from '../fields/Input'
import InputNumber from '../fields/InputNumber'
import Operation from '../fields/Operation'
import Priority from '../fields/Priority'
import Select from '../fields/Select'
import Status from '../fields/Status'
import Text from '../fields/Text'

import type { IPropsComponent } from '../types'

const Index = (props: IPropsComponent) => {
	const { column, value, editing, onFocus, onBlur, onChange } = props
	const { type, width, props: self_props } = column

	const Component = useMemo(() => {
		// 这里不使用React.lazy进行动态导入，因为单元格进入编辑状态时会闪现空白，如果是Form可使用动态导入
		switch (type) {
			case 'date':
				return Date
			case 'date_picker':
				return DatePicker
			case 'input':
				return Input
			case 'input_number':
				return InputNumber
			case 'priority':
				return Priority
			case 'select':
				return Select
			case 'status':
				return Status
			case 'text':
				return Text
			case 'http_code':
				return HttpCode
			case 'http_code_indicator':
				return HttpCodeIndicator
			case 'operation':
				return Operation
		}
	}, [type])

	// @ts-ignore
	return <Component {...{ self_props, width, value, editing, onFocus, onBlur, onChange }} />
}

export default $.memo(Index)
