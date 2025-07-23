import { useMemo } from 'react'
import Color from 'color'
import { features_metadata } from 'fst/llm'

import { Icon, LLM } from '@/components'
import { splitLLMName } from '@/utils'

import type { Provider } from 'fst/llm'
import type { DeepRequired } from 'ts-essentials'

type ModelItem = Provider['models'][number]['items'][number]
type Keys = keyof DeepRequired<ModelItem>['features']

interface IProps {
	item: ModelItem
}

const Index = (props: IProps) => {
	const { item } = props
	const { id, name, features } = item

	const { model, branch } = useMemo(() => splitLLMName(name), [name])

	return (
		<div className='model_item border_box flex flex_column align_center' key={item.id}>
			<div className='icon_wrap flex justify_center align_center'>
				<LLM name={id}></LLM>
			</div>
			<div className='name_wrap flex flex_column align_center'>
				<If condition={model}>
					<span className='model'>{model}</span>
				</If>
				<span className='branch'>{branch}</span>
			</div>
			<If condition={features !== undefined}>
				<div className='features flex flex_wrap justify_center'>
					{Object.keys(features!).map(key => {
						const feature = features_metadata[key as Keys]
						const { icon, color } = feature

						return (
							<div
								className='feature flex justify_center align_center'
								style={{
									'--color': Color(color).rgb().array().join(',')
								}}
								key={key}
							>
								<Icon id={icon}></Icon>
							</div>
						)
					})}
				</div>
			</If>
		</div>
	)
}

export default $app.memo(Index)
