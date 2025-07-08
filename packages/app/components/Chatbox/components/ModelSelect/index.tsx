import { Select } from '@/components'

import styles from './index.module.css'

import type { IPropsModelSelect } from '../../types'

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

const Index = (props: IPropsModelSelect) => {
	const { select_model, setSelectModel } = props

	return (
		<Select
			className={styles._local}
			popupClassName={styles.popup}
			placement='bottomRight'
			showSearch
			mode='multiple'
			maxCount={3}
			popupMatchSelectWidth={false}
			defaultValue={[options[0]['value']]}
			options={options}
			value={select_model}
			onChange={setSelectModel}
		></Select>
	)
}

export default $app.memo(Index)
