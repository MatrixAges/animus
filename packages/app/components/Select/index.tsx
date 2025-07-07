import { Select } from 'antd'
import { deepmerge } from 'deepmerge-ts'

import { CaretDownIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { SelectProps } from 'antd'

export interface IProps extends SelectProps {}

const Index = (props: IProps) => {
	const { className, classNames = {}, ...rest_props } = props

	return (
		<Select
			className={$cx('border_box', styles._local, className)}
			classNames={deepmerge({ popup: { root: styles.popup } }, classNames)}
			variant='filled'
			popupMatchSelectWidth={false}
			suffixIcon={<CaretDownIcon></CaretDownIcon>}
			defaultValue='Gemini 2.0 Flash'
			{...rest_props}
		></Select>
	)
}

export default $app.memo(Index)
