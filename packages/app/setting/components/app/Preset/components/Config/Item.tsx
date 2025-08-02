import { useMemoizedFn } from 'ahooks'
import { Form, Input, InputNumber } from 'antd'

import { TrashIcon } from '@phosphor-icons/react'

import type { IPropsConfigItem } from '../../types'

const { Item } = Form

const Index = (props: IPropsConfigItem) => {
	const { index, remove } = props

	const onRemove = useMemoizedFn(() => remove(index))

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
				<Item name={[index, 'temperature']} label='Temperature'>
					<InputNumber className='w_100' min={0} max={2} precision={2} step={0.1}></InputNumber>
				</Item>
				<Item name={[index, 'top_p']} label='Top P'>
					<InputNumber className='w_100' min={0} max={1} precision={2} step={0.1}></InputNumber>
				</Item>
				<Item name={[index, 'max_ouput_tokens']} label='Max Output Tokens'>
					<InputNumber className='w_100' min={0} precision={0} step={100}></InputNumber>
				</Item>
				<Item className='textarea_wrap' name={[index, 'system_prompt']} label='System Prompt'>
					<textarea className='textarea w_100 border_box'></textarea>
				</Item>
			</div>
		</div>
	)
}

export default $app.memo(Index)
