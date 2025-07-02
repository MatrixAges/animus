import { useState } from 'react'
import { InputNumber, Popover, Slider, Switch, Tooltip } from 'antd'

import { GearSixIcon, InfoIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const Index = () => {
	const [temperature, setTemperature] = useState(0.7)
	const [top_p, setTopP] = useState(0.4)
	const [max_token, setMaxToken] = useState(0)

	const Content = (
		<div className='config_items border_box flex flex_column'>
			<div className='config_item flex flex_column'>
				<div className='header w_100 flex justify_between align_center'>
					<div className='title_wrap flex align_center'>
						<span className='title'>Temperature</span>
						<Tooltip
							destroyOnHidden
							arrow={false}
							title='Control the randomness of the returned text, lower is less random'
						>
							<InfoIcon className='icon'></InfoIcon>
						</Tooltip>
					</div>
					<InputNumber
						className='value'
						controls={false}
						min={0}
						max={2}
						precision={2}
						value={temperature}
						onBlur={e => setTemperature(parseFloat(e.target.value))}
					></InputNumber>
				</div>
				<div className='changer w_100'>
					<Slider
						className='slider'
						tooltip={{ open: false }}
						min={0}
						max={2}
						step={0.1}
						value={temperature}
						onChange={setTemperature}
					></Slider>
				</div>
			</div>
			<div className='config_item flex flex_column'>
				<div className='header w_100 flex justify_between align_center'>
					<div className='title_wrap flex align_center'>
						<span className='title'>Top P</span>
						<Tooltip
							destroyOnHidden
							arrow={false}
							title='The cumulative probability of the most likely tokens to return'
						>
							<InfoIcon className='icon'></InfoIcon>
						</Tooltip>
					</div>
					<InputNumber
						className='value'
						controls={false}
						min={0}
						max={1}
						precision={2}
						value={top_p}
						onBlur={e => setTopP(parseFloat(e.target.value))}
					></InputNumber>
				</div>
				<div className='changer w_100'>
					<Slider
						className='slider'
						tooltip={{ open: false }}
						min={0}
						max={1}
						step={0.1}
						value={top_p}
						onChange={setTopP}
					></Slider>
				</div>
			</div>
			<div className='config_item flex flex_column'>
				<div className='header w_100 flex justify_between align_center'>
					<div className='title_wrap flex align_center'>
						<span className='title'>Max Output Tokens</span>
						<Tooltip
							destroyOnHidden
							arrow={false}
							title='The maximum number of tokens to return, set to 0 to disable'
						>
							<InfoIcon className='icon'></InfoIcon>
						</Tooltip>
					</div>
					<Switch
						size='small'
						checked={max_token > 0}
						onChange={v => setMaxToken(v ? 10000 : 0)}
					></Switch>
				</div>
				<div className='changer w_100'>
					<InputNumber
						className='input_number w_100'
						min={0}
						precision={0}
						step={100}
						disabled={!max_token}
						value={max_token}
						onChange={v => setMaxToken(v || 0)}
					></InputNumber>
				</div>
			</div>
		</div>
	)

	return (
		<Popover rootClassName={styles._local} trigger={['click']} placement='bottom' content={Content}>
			<div>
				<div className='option_item flex justify_center align_center clickit'>
					<GearSixIcon></GearSixIcon>
				</div>
			</div>
		</Popover>
	)
}

export default $app.memo(Index)
