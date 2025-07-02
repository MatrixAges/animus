import { Select } from 'antd'

import { CaretDownIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const options = [
	{
		label: 'Gemini 2.0 Flash',
		value: 'Gemini 2.0 Flash'
	},
	{
		label: 'Claude opus 4',
		value: 'Claude opus 4'
	},
	{
		label: 'Claude sonnet 4',
		value: 'Claude sonnet 4'
	}
]

const Index = () => {
	return (
		<Select
			className={$cx('border_box', styles._local)}
			classNames={{ popup: { root: styles.popup } }}
			variant='filled'
			popupMatchSelectWidth={false}
			suffixIcon={<CaretDownIcon></CaretDownIcon>}
			options={options}
			defaultValue='Gemini 2.0 Flash'
		></Select>
	)
}

export default $app.memo(Index)
