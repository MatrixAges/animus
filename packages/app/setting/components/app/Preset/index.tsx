import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'

import { FadersHorizontalIcon, LightbulbFilamentIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const Index = () => {
	const { t } = useTranslation()

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<div className='header_wrap flex justify_between align_center'>
				<span className='setting_title'>{t('setting.preset.title')}</span>
				<Tabs
					items={[
						{
							key: '0',
							label: 'Config',
							icon: <FadersHorizontalIcon weight='bold'></FadersHorizontalIcon>
						},
						{
							key: '1',
							label: 'Prompt',
							icon: <LightbulbFilamentIcon weight='bold'></LightbulbFilamentIcon>
						}
					]}
				></Tabs>
			</div>
		</div>
	)
}

export default $app.memo(Index)
