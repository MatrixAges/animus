import { useMemoizedFn } from 'ahooks'
import { Form, Input, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'

import { confirm } from '@/utils'
import { TrashIcon } from '@phosphor-icons/react'

import type { IPropsConfigItem } from '../../types'

const { Item } = Form

const Index = (props: IPropsConfigItem) => {
	const { index, remove } = props
	const { t } = useTranslation()

	const onRemove = useMemoizedFn(async () => {
		const res = await confirm({
			title: t('notice'),
			content: t('config_remove_confirm'),
			zIndex: 1000000,
			width: 300
		})

		if (!res) return

		remove(index)
	})

	return (
		<div className='config_item w_100 border_box flex flex_column'>
			<div className='config_header flex justify_between'>
				<Item name={[index, 'name']} noStyle>
					<Input></Input>
				</Item>
				<div className='btn_action flex justify_center align_center clickit' onClick={onRemove}>
					<TrashIcon></TrashIcon>
				</div>
			</div>
			<div className='fields_wrap w_100 border_box flex flex_column'>
				<Item name={[index, 'temperature']} label={t('chatbox.temperature.title')}>
					<InputNumber className='w_100' min={0} max={2} precision={2} step={0.1}></InputNumber>
				</Item>
				<Item name={[index, 'top_p']} label={t('chatbox.top_p.title')}>
					<InputNumber className='w_100' min={0} max={1} precision={2} step={0.1}></InputNumber>
				</Item>
				<Item name={[index, 'max_ouput_tokens']} label={t('chatbox.max_ouput_tokens.title')}>
					<InputNumber className='w_100' min={0} precision={0} step={100}></InputNumber>
				</Item>
				<Item
					className='textarea_wrap'
					name={[index, 'system_prompt']}
					label={t('chatbox.system_prompt.title')}
				>
					<textarea className='textarea w_100 border_box'></textarea>
				</Item>
			</div>
		</div>
	)
}

export default $app.memo(Index)
