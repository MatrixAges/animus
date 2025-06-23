import { Fragment, useMemo } from 'react'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

import { Logo } from '@/components'
import { useDelegate } from '@/hooks'
import { WinActions } from '@/layout'
import { ipc, is_win_electron } from '@/utils'
import { ChatIcon, GearSixIcon, MagnifyingGlassIcon, SidebarIcon, SignOutIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsEmpty } from '@/layout'
import type { ElementOf } from 'ts-essentials'

const raw_actions = [
	{ title: 'sidebar', Icon: SidebarIcon },
	{ title: 'chat', Icon: ChatIcon },
	{ title: 'search', Icon: MagnifyingGlassIcon },
	{ title: 'setting', Icon: GearSixIcon },
	{ title: 'exit', Icon: SignOutIcon }
] as const

const Index = (props: IPropsEmpty) => {
	const { sidebar_fold, showSidebar, toggleSetting } = props
	const { t } = useTranslation()

	const actions = useMemo(() => {
		const target = raw_actions.slice()

		if (!sidebar_fold) target.shift()

		return target
	}, [sidebar_fold])

	const ref = useDelegate((v: ElementOf<typeof raw_actions>['title']) => {
		switch (v) {
			case 'sidebar':
				showSidebar()
				break
			case 'chat':
				break
			case 'setting':
				toggleSetting()
				break
			case 'exit':
				ipc.app.exit.query()
				break
		}
	})

	return (
		<Fragment>
			<div
				className='w_100 absolute z_index_10 top_0 left_0 flex justify_between is_drag'
				style={{ height: 36 }}
			>
				<If condition={is_win_electron}>
					<WinActions></WinActions>
				</If>
			</div>
			<div
				className={$cx(
					'w_100 h_100 flex flex_column justify_center align_center is_drag',
					styles._local
				)}
			>
				<Logo className='logo' size={150} color='var(--color_border_light)'></Logo>
				<div className='actions_wrap flex absolute' ref={ref}>
					{actions.map(({ title, Icon }) => (
						<Tooltip title={t(`layout.Empty.${title}`)} key={title}>
							<div>
								<div
									className='btn_action border_box flex justify_center align_center clickable no_drag'
									data-key={title}
								>
									<Icon size={16}></Icon>
								</div>
							</div>
						</Tooltip>
					))}
				</div>
			</div>
		</Fragment>
	)
}

export default $app.memo(Index)
