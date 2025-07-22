import { Fragment } from 'react'
import { Button, Select, Switch, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { locale_options, themes } from '@/appdata'
import { useGlobal } from '@/context'
import { Item } from '@/layout/components/Setting/components'
import { clearStorage } from '@/utils'
import { AppWindowIcon, CircuitryIcon, MoonIcon, PaletteIcon, SunIcon, TranslateIcon } from '@phosphor-icons/react'

const Index = () => {
	const global = useGlobal()
	const { t } = useTranslation()

	return (
		<Fragment>
			<span className='setting_title'>{t('setting.general.normal.title')}</span>
			<div className='setting_items w_100 border_box flex flex_column'>
				<Item
					name='lang'
					Icon={TranslateIcon}
					title={t('setting.general.normal.language.title')}
					desc={t('setting.general.normal.language.desc')}
				>
					<Select
						className='select'
						options={locale_options}
						popupMatchSelectWidth={false}
					></Select>
				</Item>
				<Item
					name='theme'
					Icon={PaletteIcon}
					title={t('setting.general.normal.theme.title')}
					desc={t('setting.general.normal.theme.desc')}
					extra={
						<Tooltip
							title={t('setting.general.normal.theme.auto_theme')}
							mouseEnterDelay={0.6}
							placement='left'
							styles={{ root: { width: 180 } }}
						>
							<Button
								className={$cx(
									'btn_action flex justify_center align_center clickable mr_12',
									global.setting.auto_theme && 'active'
								)}
								onClick={global.setting.toggleAutoTheme}
								shape='circle'
								variant='text'
							>
								{global.setting.theme_value === 'light' ? (
									<MoonIcon
										size={18}
										weight={global.setting.auto_theme ? 'fill' : 'regular'}
									></MoonIcon>
								) : (
									<SunIcon
										size={18}
										weight={global.setting.auto_theme ? 'fill' : 'regular'}
									></SunIcon>
								)}
							</Button>
						</Tooltip>
					}
				>
					<Select
						className='select'
						options={themes.map(item => ({
							label: t(`setting.general.normal.theme.options.${item}`),
							value: item
						}))}
						popupMatchSelectWidth={false}
					></Select>
				</Item>
				<Item
					name='glass'
					Icon={AppWindowIcon}
					title={t('setting.general.normal.glass.title')}
					desc={t('setting.general.normal.glass.desc')}
				>
					<Switch size='small'></Switch>
				</Item>
				<Item
					Icon={CircuitryIcon}
					title={t('setting.general.normal.cache.title')}
					desc={t('setting.general.normal.cache.desc')}
					pure
				>
					<Button className='btn flex justify_center align_center clickable' onClick={clearStorage}>
						{t('setting.general.normal.cache.clear')}
					</Button>
				</Item>
			</div>
		</Fragment>
	)
}

export default new window.$app.handle(Index).by(observer).by(window.$app.memo).get()
