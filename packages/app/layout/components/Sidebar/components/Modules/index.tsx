import { useTranslation } from 'react-i18next'

import { modules } from '@/appdata'
import { ModuleIcon } from '@/components'

import styles from './index.module.css'

const Index = () => {
	const { t } = useTranslation()

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			{modules.map(item => (
				<div className='module_item flex align_center clickit' key={item}>
					<div className='icon_wrap flex'>
						<ModuleIcon module={item}></ModuleIcon>
					</div>
					<span className='name'>{t(`app.module.${item}`)}</span>
				</div>
			))}
		</div>
	)
}

export default $app.memo(Index)
