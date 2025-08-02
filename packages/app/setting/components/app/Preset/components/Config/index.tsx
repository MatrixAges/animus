import { useMemoizedFn } from 'ahooks'
import { Form } from 'antd'
import { debounce } from 'es-toolkit/compat'

import { preset_config } from '@/appdata'
import { PlusIcon } from '@phosphor-icons/react'

import { IPropsConfig } from '../../types'
import Item from './Item'

import styles from './index.module.css'

const { useForm, List } = Form

const Index = (props: IPropsConfig) => {
	const { configs, setConfigs } = props
	const [form] = useForm()

	const onValuesChange = useMemoizedFn(
		debounce((_, values) => {
			setConfigs(values.items)
		}, 450)
	)

	return (
		<Form
			className={$cx('w_100 border_box', styles._local)}
			layout='vertical'
			form={form}
			initialValues={{ items: configs }}
			onValuesChange={onValuesChange}
		>
			<List name='items'>
				{(fields, { add, remove }) => (
					<div className='w_100 border_box flex flex_column'>
						<div className='config_items w_100 border_box flex flex_wrap'>
							{fields.map(({ key, name: index }) => (
								<Item index={index} remove={remove} key={key}></Item>
							))}
							<div
								className='config_item w_100 border_box flex justify_center align_center pt_20 pb_20 clickit'
								onClick={() => add(preset_config)}
							>
								<PlusIcon size={24}></PlusIcon>
							</div>
						</div>
					</div>
				)}
			</List>
		</Form>
	)
}

export default $app.memo(Index)
