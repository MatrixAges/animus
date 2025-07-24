import { Fragment, useMemo, useRef } from 'react'
import { Drawer, Tabs } from 'antd'
import { RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Modal, ModuleIcon } from '@/components'
import { useDelegate, useSize } from '@/hooks'
import { ListIcon } from '@phosphor-icons/react'

import { Workspaces } from './components'
import { app_setting_items, module_setting_items } from './options'

import styles from './index.module.css'

import type { IPropsSetting } from '@/layout'
import type { HasUpdate } from '@/types'
import type { ReactElement } from 'react'
import type { SettingType } from './options'

const Index = (props: IPropsSetting) => {
	const { update_status, visible, active, visible_menu, onClose, toggleMenu, onMenuItem } = props
	const { t } = useTranslation()
	const ref = useRef<HTMLDivElement>(null)
	const body_width = useSize(() => document.body, 'width') as number
	const narrow = useMemo(() => (body_width || 0) <= 840, [body_width])

	const ref_list = useDelegate((v: SettingType) => onMenuItem(v), { visible, duration: 180 })

	const Menu = (
		<div className={$cx('h_100 border_box flex flex_column relative', styles.menu)}>
			<div className='menu_items w_100 border_box flex flex_column' ref={ref_list}>
				{app_setting_items.map(({ label, Icon, key }) => (
					<div
						className={$cx(
							'menu_item border_box flex justify_start align_center relative clickit',
							active === key && 'active'
						)}
						data-key={key}
						key={key}
					>
						<Icon className='icon_module' size={16} weight='regular'></Icon>
						<span className='menu_name'>{t(label)}</span>
						<If condition={key === 'general' && update_status?.type === 'has_update'}>
							<div className='new_version flex align_center absolute'>
								<RefreshCw className='icon' size={9} strokeWidth={2.4}></RefreshCw>
								{(update_status as HasUpdate)?.version}
							</div>
						</If>
					</div>
				))}
				<div className='divider w_100 border_box'></div>
				{module_setting_items.map(({ label, key }) => (
					<div
						className={$cx(
							'menu_item border_box flex justify_start align_center relative clickit',
							active === key && 'active'
						)}
						data-key={key}
						key={key}
					>
						<ModuleIcon module={key} size={16} weight='regular'></ModuleIcon>
						<span className='menu_name'>{t(label)}</span>
					</div>
				))}
			</div>
			<Workspaces></Workspaces>
		</div>
	)

	return (
		<Modal
			className={$cx('relative', styles.modal)}
			open={visible}
			mask_closable
			global
			getRef={v => (ref.current = v)}
			onClose={onClose}
		>
			{narrow ? (
				<Fragment>
					<div
						className='btn_toggle_menu flex justify_center align_center absolute clickable no_drag'
						onClick={toggleMenu}
					>
						<ListIcon size={15}></ListIcon>
					</div>
					<Drawer
						rootClassName={styles.menu_drawer}
						maskClassName={styles.menu_drawer_mask}
						open={visible_menu}
						placement='left'
						closeIcon={false}
						width={162}
						maskClosable
						rootStyle={{ position: 'absolute' }}
						getContainer={() => ref.current!}
						onClose={toggleMenu}
					>
						{Menu}
					</Drawer>
				</Fragment>
			) : (
				Menu
			)}
			<div className={$cx('h_100 border_box flex flex_column', styles.tabs_wrap)}>
				<Tabs
					items={[...app_setting_items, ...module_setting_items]}
					activeKey={active}
					renderTabBar={() => null as unknown as ReactElement}
				></Tabs>
			</div>
		</Modal>
	)
}

export default $app.memo(Index)
