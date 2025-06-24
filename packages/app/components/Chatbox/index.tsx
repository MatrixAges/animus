import { ArrowUpIcon, CaretDownIcon, GearSixIcon, PlusIcon, SlidersHorizontalIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const Index = () => {
	return (
		<div className={$cx('w_100 border_box flex flex_column relative', styles._local)}>
			<textarea className='textarea w_100 border_box' placeholder='Can I help you with?'></textarea>
			<div className='option_items w_100 border_box flex justify_between align_center absolute bottom_0'>
				<div className='gap_wrap flex align_center'>
					<div className='option_item flex justify_center align_center clickit'>
						<PlusIcon></PlusIcon>
					</div>
					<div className='option_item flex justify_center align_center clickit'>
						<SlidersHorizontalIcon></SlidersHorizontalIcon>
					</div>
					<div className='option_item flex justify_center align_center clickit'>
						<GearSixIcon></GearSixIcon>
					</div>
				</div>
				<div className='gap_wrap flex align_center'>
					<div className='model_select option_item flex justify_center align_center clickit'>
						<span className='model'>Gemini 2.0 Flash</span>
						<CaretDownIcon></CaretDownIcon>
					</div>
					<div className='btn_submit option_item flex justify_center align_center clickit'>
						<ArrowUpIcon weight='bold'></ArrowUpIcon>
					</div>
				</div>
			</div>
		</div>
	)
}

export default $app.memo(Index)
