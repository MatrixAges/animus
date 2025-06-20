import { useDelegate } from '@/hooks'
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
	const { toggleSetting, closeSidebar } = props

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
		<div className={$cx('w_100 border_box flex justify_end align_center is_drag', styles._local)}>
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
