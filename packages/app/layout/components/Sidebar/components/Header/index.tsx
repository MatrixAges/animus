import { Icon } from '@/components'
import { useDelegate } from '@/hooks'
import { is_win_electron } from '@/utils'
import { GearSixIcon, MagnifyingGlassIcon, SidebarIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsSidebarHeader } from '@/layout/types'
import type { ElementOf } from 'ts-essentials'

const actions = (
	[
		{ key: 'search', Icon: MagnifyingGlassIcon },
		{ key: 'setting', Icon: GearSixIcon },
		{ key: 'sidebar', Icon: SidebarIcon }
	] as const
).slice()

const Index = (props: IPropsSidebarHeader) => {
	const { workspace, toggleSetting, closeSidebar } = props
	const { name, icon, icon_type } = workspace

	const ref = useDelegate((v: ElementOf<typeof actions>['key']) => {
		switch (v) {
			case 'search':
				break
			case 'setting':
				toggleSetting()
				break
			case 'sidebar':
				closeSidebar()
				break
		}
	})

	return (
		<div
			className={$cx(
				'w_100 border_box flex align_center is_drag',
				styles._local,
				is_win_electron ? 'justify_between' : 'justify_end'
			)}
		>
			<If condition={is_win_electron}>
				<div className='workspace_wrap flex align_center'>
					<Icon id={icon} icon_type={icon_type} size={15}></Icon>
					<span className='workspace'>{name}</span>
				</div>
			</If>
			<div className='actions_wrap flex align_center' ref={ref}>
				{actions.map(({ key, Icon }) => (
					<div
						className='btn_action flex justify_center align_center clickable no_drag clickit'
						data-key={key}
						key={key}
					>
						<Icon size={16}></Icon>
					</div>
				))}
			</div>
		</div>
	)
}

export default $app.memo(Index)
