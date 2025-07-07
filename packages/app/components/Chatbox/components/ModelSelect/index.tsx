import { Select } from '@/components'

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
	return <Select className={styles._local} options={options} defaultValue='Gemini 2.0 Flash'></Select>
}

export default $app.memo(Index)
