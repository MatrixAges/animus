import { Fragment, useMemo } from 'react'
import { useToggle } from 'ahooks'
import { Form } from 'antd'
import Color from 'color'
import { features_metadata } from 'fst/llm'

import { Icon, LLM, Modal } from '@/components'
import { splitLLMName } from '@/utils'

import ModelForm from './ModelForm'

import styles from './index.module.css'

import type { FeaturesKey, Model } from 'fst/llm'

const { useFormInstance } = Form

interface IProps {
	item: Model
	group_index: number
	model_index: number
}

const Index = (props: IProps) => {
	const { item, group_index, model_index } = props
	const { enabled, id, name, features } = item
	const [visible, { toggle }] = useToggle()
	const { setFieldValue } = useFormInstance()

	const { model, branch } = useMemo(() => splitLLMName(name), [name])

	return (
		<Fragment>
			<div
				className={$cx(
					'model_item border_box flex flex_column align_center clickable',
					!enabled && 'not_enabled'
				)}
				onClick={toggle}
			>
				<div className='icon_wrap flex justify_center align_center'>
					<LLM name={id}></LLM>
				</div>
				<div className='name_wrap w_100 flex flex_column align_center'>
					<If condition={model}>
						<span className='model'>{model}</span>
					</If>
					<span className='branch w_100 text_center line_clamp_1' title={branch}>
						{branch}
					</span>
				</div>
				<If condition={features !== undefined}>
					<div className='features flex flex_wrap justify_center'>
						{Object.keys(features!).map(key => {
							const feature = features_metadata[key as FeaturesKey]
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
			<Modal
				className={styles.model_form_modal}
				global
				mask_closable
				z_index={100000}
				open={visible}
				onClose={toggle}
			>
				<ModelForm {...{ item, group_index, model_index, setFieldValue }} onClose={toggle}></ModelForm>
			</Modal>
		</Fragment>
	)
}

export default $app.memo(Index)
