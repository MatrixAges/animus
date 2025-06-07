import { Fragment } from 'react'
import { Select, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { locale_options, themes } from '@/appdata'
import { useGlobal } from '@/context'
import Item from '@/layout/components/Setting/Item'
import { clearStorage } from '@/utils'
import { CircuitryIcon, MoonIcon, PaletteIcon, SunIcon, TranslateIcon } from '@phosphor-icons/react'

const Index = () => {
	const global = useGlobal()
	const { t } = useTranslation()

	return (
		<Fragment>
			<span className='setting_title'>{t('setting.general.normal.title')}</span>
			<div className='setting_items w_100 border_box flex flex_column'>
				<Item
					Icon={TranslateIcon}
					title={t('setting.general.normal.language.title')}
					desc={t('setting.general.normal.language.desc')}
				>
					<Select
						className='select'
						value={global.setting.lang}
						options={locale_options}
						onSelect={global.setting.setLang}
					></Select>
				</Item>
				<Item
					Icon={PaletteIcon}
					title={t('setting.general.normal.theme.title')}
					desc={t('setting.general.normal.theme.desc')}
				>
					<Tooltip
						title={t('setting.general.normal.theme.auto_theme')}
						mouseEnterDelay={0.6}
						styles={{ root: { width: 180 } }}
					>
						<button
							className={$cx(
								'btn_auto_theme btn_action flex justify_center align_center clickable mr_12',
								global.setting.auto_theme && 'active'
							)}
							onClick={global.setting.toggleAutoTheme}
						>
							{global.setting.theme === 'light' ? (
								<MoonIcon size={18}></MoonIcon>
							) : (
								<SunIcon size={18}></SunIcon>
							)}
						</button>
					</Tooltip>
					<Select
						className='select'
						value={global.setting.theme}
						options={themes.map(item => ({
							label: t(`setting.general.normal.theme.options.${item}`),
							value: item
						}))}
						onSelect={v => global.setting.setTheme(v)}
					></Select>
				</Item>
				<Item
					Icon={CircuitryIcon}
					title={t('setting.general.normal.cache.title')}
					desc={t('setting.general.normal.cache.desc')}
				>
					<button className='btn flex justify_center align_center clickable' onClick={clearStorage}>
						{t('setting.general.normal.cache.clear')}
					</button>
				</Item>
			</div>
		</Fragment>
	)
}

export default new window.$app.handle(Index).by(observer).by(window.$app.memo).get()
