import { AirplaneIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { File } from '@/types'

const items = [
	{ id: '6', module: 'chat', icon: 'bulb', name: 'OpenAI Translator' },
	{ id: '7', module: 'chat', icon: 'brain', name: 'Web Designer' },
	{ id: '8', module: 'chat', icon: 'search', name: 'Shopping Director' },
	{ id: '1', module: 'note', icon: 'airplane', name: 'Ethics Overview' },
	{ id: '3', module: 'note', icon: 'chip', name: 'Deep Learning Trends' },
	{ id: '5', module: 'note', icon: 'cloud', name: 'AI in Healthcare' }
] as Array<File>

const Index = () => {
	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<span className='title'>Favorite</span>
			<div className='list_wrap flex flex_column'>
				{items.map(item => (
					<div className='w_100 border_box list_item_wrap flex align_center clickit' key={item.id}>
						<span className='icon_wrap flex align_center'>
							<AirplaneIcon></AirplaneIcon>
						</span>
						<span className='name line_clamp_1'>{item.name}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default $app.memo(Index)
