import { Switch } from 'antd'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { ListDashesIcon, PulseIcon, TextAUnderlineIcon, TextHThreeIcon, TextTIcon } from '@phosphor-icons/react'

import Item from '../../Item'

const Index = () => {
	const { t } = useTranslation()

	return (
		<div className='flex flex_column'>
			<span className='setting_title'>{t('app.module.note')}</span>
			<div className='setting_items w_100 border_box flex flex_column'>
				<Item
					Icon={ListDashesIcon}
					title={t('setting.note.toc.title')}
					desc={t('setting.note.toc.desc')}
				>
					<Switch size='small'></Switch>
				</Item>
				<Item
					Icon={TextHThreeIcon}
					title={t('setting.note.show_heading_text.title')}
					desc={t('setting.note.show_heading_text.desc')}
				>
					<Switch size='small'></Switch>
				</Item>
				<Item
					Icon={TextTIcon}
					title={t('setting.note.serif.title')}
					desc={t('setting.note.serif.desc')}
				>
					<Switch size='small'></Switch>
				</Item>
				<Item
					Icon={TextAUnderlineIcon}
					title={t('setting.note.small_text.title')}
					desc={t('setting.note.small_text.desc')}
				>
					<Switch size='small'></Switch>
				</Item>
				<Item
					Icon={PulseIcon}
					title={t('setting.note.count.title')}
					desc={t('setting.note.count.desc')}
				>
					<Switch size='small'></Switch>
				</Item>
			</div>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
