import { Select } from 'antd'
import { deepmerge } from 'deepmerge-ts'

import { CaretDownIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { SelectProps } from 'antd'

export interface IProps extends SelectProps {
	popupClassName?: string
}

const Index = (props: IProps) => {
	const { className, classNames = {}, popupClassName, ...rest_props } = props

	return (
		<Select
			className={$cx('border_box', styles._local, className)}
			classNames={deepmerge({ popup: { root: $cx(styles.popup, popupClassName) } }, classNames)}
			suffixIcon={<CaretDownIcon></CaretDownIcon>}
			{...rest_props}
		></Select>
	)
}

export default $app.memo(Index)
