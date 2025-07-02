import { ArrowUpIcon } from '@phosphor-icons/react'

import { Config, File, ModelSelect, Setting } from './components'

import styles from './index.module.css'

const Index = () => {
	return (
		<div className={$cx('w_100 border_box flex flex_column relative', styles._local)}>
			<textarea className='textarea w_100 border_box' placeholder='Can I help you with?'></textarea>
			<div className='option_items w_100 border_box flex justify_between align_center absolute bottom_0'>
				<div className='gap_wrap flex align_center'>
					<File></File>
					<Config></Config>
					<Setting></Setting>
				</div>
				<div className='gap_wrap flex align_center'>
					<ModelSelect></ModelSelect>
					<div className='btn_submit option_item flex justify_center align_center clickit'>
						<ArrowUpIcon weight='bold'></ArrowUpIcon>
					</div>
				</div>
			</div>
		</div>
	)
}

export default $app.memo(Index)
