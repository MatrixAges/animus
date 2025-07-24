import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { id } from 'stk/common'

import { Empty, LLM } from '@/components'
import { PlusIcon } from '@phosphor-icons/react'

import ModelItem from './ModelItem'

import type { Model, Provider } from 'fst/llm'

const { Item, List } = Form

interface IProps {
	group: Provider['models'][number]
	group_index: number
}

const Index = (props: IProps) => {
	const { group, group_index } = props
	const { t } = useTranslation()

	return (
		<List name={[group_index, 'items']}>
			{(model_items, { add, remove }) => (
				<div className='group_item w_100 border_box flex flex_column'>
					<div className='header w_100 border_box flex justify_between align_center'>
						<div className='group flex align_center'>
							<LLM name={group.group}></LLM>
							<Item name={[group_index, 'group']}>
								<Input
									className='input'
									placeholder='Group name'
									maxLength={18}
								></Input>
							</Item>
						</div>
						<button
							className='btn flex align_center clickable'
							onClick={() =>
								add({
									enabled: true,
									id: 'deepseek ' + id(),
									name: 'Deepseek rx',
									features: {}
								} as Model)
							}
						>
							<PlusIcon weight='bold'></PlusIcon>
							<span>{t('model')}</span>
						</button>
					</div>
					<Choose>
						<When condition={group.items.length}>
							<div className='model_items w_100 border_box flex flex_wrap'>
								{model_items.map(({ key, name: model_index }, index) => {
									const item = group.items[index]

									return (
										<ModelItem
											item={item}
											group_index={group_index}
											model_index={model_index}
											key={key}
										></ModelItem>
									)
								})}
							</div>
						</When>
						<Otherwise>
							<div className='empty_wrap for_model w_100 flex justify_center align_center'>
								<Empty></Empty>
							</div>
						</Otherwise>
					</Choose>
				</div>
			)}
		</List>
	)
}

export default $app.memo(Index)
