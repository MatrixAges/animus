import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'

import { Chatbox, Icon } from '@/components'
import { useStackEffect } from '@/hooks'
import { DotsThreeVerticalIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const role_items = [
	{ id: '0', name: 'Web Designer', icon: 'angular-logo' },
	{ id: '1', name: 'Product Manager', icon: 'baby' },
	{ id: '2', name: 'Shopping Director', icon: 'shopping-bag' },
	{ id: '4', name: 'Personal Secretary', icon: 'airplane' }
]

const recent_items = [
	{ id: '0', question: 'How can I improve my website’s loading speed?', update_at: 1719870000000 },
	{ id: '1', question: 'What are the latest trends in UI design?', update_at: 1719873600000 },
	{ id: '2', question: 'How do I prioritize features for my product roadmap?', update_at: 1719877200000 },
	{ id: '3', question: 'What strategies can boost online sales?', update_at: 1719880800000 },
	{ id: '4', question: 'How does SEO impact my site ranking?', update_at: 1719884400000 },
	{ id: '5', question: 'Can you suggest tools for team collaboration?', update_at: 1719888000000 }
]

const Index = () => {
	const { bind } = useStackEffect({
		mounted: () => {},
		onShow: () => {}
	})

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)} ref={bind}>
			<h1 className='hello'>What's good, today?</h1>
			<Chatbox></Chatbox>
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
			<div className='section_title_wrap flex justify_between align_center'>
				<h2 className='section_title'>Recent</h2>
				<div className='btn_action flex justify_center align_center clickable'>
					<DotsThreeVerticalIcon weight='bold'></DotsThreeVerticalIcon>
				</div>
			</div>
			<div className='recent_items w_100 border_box flex flex_column'>
				{recent_items.map(item => (
					<div className='recent_item flex justify_between align_center cursor_point' key={item.id}>
						<span className='question'>{item.question}</span>
						<span className='update_at'>{dayjs(item.update_at).fromNow()}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
