import { useMemoizedFn } from 'ahooks'
import { InputNumber, Popover, Slider, Switch, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

import { GearSixIcon, InfoIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { FocusEvent } from 'react'
import type { IPropsSetting } from '../../types'

const Index = (props: IPropsSetting) => {
	const { temperature, top_p, max_ouput_tokens, setTemperature, setTopP, setMaxOutputTokens } = props
	const { t } = useTranslation()

	const onBlurTemperature = useMemoizedFn((e: FocusEvent<HTMLInputElement>) =>
		setTemperature(parseFloat(e.target.value ?? 0))
	)

	const onBlurTopP = useMemoizedFn((e: FocusEvent<HTMLInputElement>) => setTopP(parseFloat(e.target.value ?? 0)))

	const onSwitchMaxOutputTokens = useMemoizedFn((v: boolean) => setMaxOutputTokens(v ? 10000 : 0))

	const onBlurMaxOutputTokens = useMemoizedFn((e: FocusEvent<HTMLInputElement>) =>
		setMaxOutputTokens(parseFloat(e.target.value ?? 0))
	)

	const Content = (
		<div className='setting_items border_box flex flex_column'>
			<div className='setting_item flex flex_column'>
				<div className='header w_100 flex justify_between align_center'>
					<div className='title_wrap flex align_center'>
						<span className='title'>{t('chatbox.temperature.title')}</span>
						<Tooltip destroyOnHidden arrow={false} title={t('chatbox.temperature.desc')}>
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
						onBlur={onBlurTemperature}
					></InputNumber>
				</div>
				<div className='changer w_100'>
					<Slider
						className='slider'
						tooltip={{ open: false }}
						min={0}
						max={2}
						step={0.1}
						defaultValue={temperature}
						onChange={setTemperature}
					></Slider>
				</div>
			</div>
			<div className='setting_item flex flex_column'>
				<div className='header w_100 flex justify_between align_center'>
					<div className='title_wrap flex align_center'>
						<span className='title'>{t('chatbox.top_p.title')}</span>
						<Tooltip destroyOnHidden arrow={false} title={t('chatbox.top_p.desc')}>
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
						onBlur={onBlurTopP}
					></InputNumber>
				</div>
				<div className='changer w_100'>
					<Slider
						className='slider'
						tooltip={{ open: false }}
						min={0}
						max={1}
						step={0.1}
						defaultValue={top_p}
						onChange={setTopP}
					></Slider>
				</div>
			</div>
			<div className='setting_item flex flex_column'>
				<div className='header w_100 flex justify_between align_center'>
					<div className='title_wrap flex align_center'>
						<span className='title'>{t('chatbox.max_ouput_tokens.title')}</span>
						<Tooltip destroyOnHidden arrow={false} title={t('chatbox.max_ouput_tokens.desc')}>
							<InfoIcon className='icon'></InfoIcon>
						</Tooltip>
					</div>
					<Switch
						size='small'
						checked={max_ouput_tokens > 0}
						onChange={onSwitchMaxOutputTokens}
					></Switch>
				</div>
				<div className='changer w_100'>
					<InputNumber
						className='input_number w_100'
						min={0}
						precision={0}
						step={100}
						disabled={!max_ouput_tokens}
						value={max_ouput_tokens}
						onBlur={onBlurMaxOutputTokens}
					></InputNumber>
				</div>
			</div>
		</div>
	)

	return (
		<Popover
			rootClassName={styles._local}
			trigger={['click']}
			placement='bottom'
			destroyOnHidden
			content={Content}
		>
			<div>
				<div className='option_item flex justify_center align_center clickit'>
					<GearSixIcon></GearSixIcon>
				</div>
			</div>
		</Popover>
	)
}

export default $app.memo(Index)
