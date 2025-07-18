import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { container } from 'tsyringe'

import { Chatbox, Icon } from '@/components'
import { useStackEffect } from '@/hooks'
import { DotsThreeVerticalIcon } from '@phosphor-icons/react'

import { Recent } from './components'
import Model from './model'

import styles from './index.module.css'

import type { IPropsChatbox } from '@/components'
import type { IPropsRecent } from './types'

const role_items = [
	{ id: '0', name: 'Web Designer', icon: 'angular-logo' },
	{ id: '1', name: 'Product Manager', icon: 'baby' },
	{ id: '2', name: 'Shopping Director', icon: 'shopping-bag' },
	{ id: '4', name: 'Personal Secretary', icon: 'airplane' }
]

const Index = () => {
	const [x] = useState(container.resolve(Model))

	const { bind } = useStackEffect({
		mounted: () => x.init(),
		unmounted: () => x.off()
	})

	const props_chatbox: IPropsChatbox = {}

	const props_recent: IPropsRecent = {
		recent: $copy(x.recent)
	}

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)} ref={bind}>
			<h1 className='hello'>What's good, today?</h1>
			<Chatbox {...props_chatbox}></Chatbox>
			<div className='section_title_wrap flex justify_between align_center'>
				<h2 className='section_title'>Role</h2>
				<div className='btn_action flex justify_center align_center clickable'>
					<DotsThreeVerticalIcon weight='bold'></DotsThreeVerticalIcon>
				</div>
			</div>
			<div className='role_items w_100 border_box flex'>
				{role_items.map(item => (
					<div className='role_item flex flex_column' key={item.id}>
						<div className='icon_wrap flex align_center'>
							<Icon id={item.icon}></Icon>
						</div>
						<span className='name'>{item.name}</span>
					</div>
				))}
			</div>
			<Recent {...props_recent}></Recent>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
