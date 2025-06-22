import { useTranslation } from 'react-i18next'

import { modules } from '@/appdata'
import { ModuleIcon } from '@/components'
import { useDelegate } from '@/hooks'

import styles from './index.module.css'

import type { IPropsSidebarModules } from '@/layout'

const Index = (props: IPropsSidebarModules) => {
	const { addPage } = props
	const { t } = useTranslation()
	const ref = useDelegate(v => addPage(v))

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)} ref={ref}>
			{modules.map(item => (
				<div className='module_item flex align_center clickit' data-key={item} key={item}>
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
