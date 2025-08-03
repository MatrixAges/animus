import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { LLM, Select } from '@/components'
import { useGlobal } from '@/context'

import styles from './index.module.css'

import type { SelectProps } from 'antd'

export interface IProps extends SelectProps {
	className?: string
	popupClassName?: string
	value?: string | Array<string>
	onChange?: (v: any) => void
}

const Index = (props: IProps) => {
	const { className, popupClassName, value, onChange, ...rest_props } = props
	const global = useGlobal()
	const { t } = useTranslation()

	const providers = $copy(global.provider.providers)

	return (
		<Select
			className={className}
			popupClassName={$cx(styles.popup, popupClassName)}
			showSearch
			placeholder={`${t('select')}${t('b')}${t('model')}`}
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
			{...rest_props}
		></Select>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
