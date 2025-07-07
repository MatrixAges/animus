import { Popover, Switch } from 'antd'

import Baidu from '@/public/images/baidu.svg?react'
import Bing from '@/public/images/bing.svg?react'
import Google from '@/public/images/google.svg?react'
import { SlidersHorizontalIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const engines = [
	{ key: 'google', logo: Google },
	{ key: 'bing', logo: Bing },
	{ key: 'baidu', logo: Baidu }
]

const Index = () => {
	const Content = (
		<div className='config_items border_box flex flex_column'>
			<div className='config_item w_100 flex justify_between align_center'>
				<div className='title_wrap flex align_center'>
					<span className='title'>Prompt rewriting</span>
				</div>
				<Switch size='small'></Switch>
			</div>
			<div className='config_item w_100 flex justify_between align_center'>
				<div className='title_wrap flex align_center'>
					<span className='title'>Submit by Enter</span>
				</div>
				<Switch size='small'></Switch>
			</div>
			<div className='config_item flex flex_column'>
				<div className='header w_100 flex justify_between align_center'>
					<span className='title'>Web Search</span>
					<Switch size='small'></Switch>
				</div>
				<div className='engine_wrap w_100 flex flex_column'>
					<div className='engine_items w_100 flex'>
						{engines.map(item => (
							<div
								className={$cx(
									'engine_item flex flex_column align_center clickit',
									item.key
								)}
								key={item.key}
							>
								<div className='logo_wrap flex justify_center align_center'>
									<item.logo />
								</div>
								<span className='name'>{item.key}</span>
							</div>
						))}
					</div>
					<div className='builtin_engine flex justify_center align_center clickit'>
						<span>LLM Builtin Search</span>
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Popover rootClassName={styles._local} trigger={['click']} placement='bottom' content={Content}>
			<div>
				<div className='option_item flex justify_center align_center clickit'>
					<SlidersHorizontalIcon></SlidersHorizontalIcon>
				</div>
			</div>
		</Popover>
	)
}

export default $app.memo(Index)
