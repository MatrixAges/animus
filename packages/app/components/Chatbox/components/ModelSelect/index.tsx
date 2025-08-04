import { observer } from 'mobx-react-lite'

import { ModelSelect } from '@/components'
import { useGlobal } from '@/context'

import styles from './index.module.css'

import type { IPropsModelSelect } from '../../types'

const Index = (props: IPropsModelSelect) => {
	const { select_model, setSelectModel } = props
	const global = useGlobal()

	const providers = $copy(global.provider.providers)

	return (
		<ModelSelect
			className={styles._local}
			popupClassName={styles.popup}
			placement='bottomRight'
			showSearch
			mode='multiple'
			labelInValue
			maxCount={12}
			popupMatchSelectWidth={false}
			defaultValue={[providers?.[0]?.['options']?.[0]?.['value']]}
			options={providers}
			value={select_model}
			onChange={setSelectModel}
		></ModelSelect>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
