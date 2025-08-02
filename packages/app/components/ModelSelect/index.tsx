import { observer } from 'mobx-react-lite'

import { LLM, Select } from '@/components'
import { useGlobal } from '@/context'

import styles from './index.module.css'

export interface IProps {
	value?: string
	onChange?: (v: string) => void
}

const Index = (props: IProps) => {
	const { value, onChange } = props
	const global = useGlobal()
	const providers = $copy(global.provider.providers)

	return (
		<Select
			popupClassName={styles.popup}
			showSearch
			optionRender={({ label, value }) => (
				<div className='model_item flex align_center'>
					<div className='icon_wrap flex justify_center align_center'>
						<LLM name={value as string}></LLM>
					</div>
					<span className='label'>{label}</span>
				</div>
			)}
			options={providers}
			value={value}
			onChange={onChange}
		></Select>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
