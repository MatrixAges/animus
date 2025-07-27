import { Fragment, useMemo } from 'react'
import { useMemoizedFn, useToggle } from 'ahooks'
import { Form } from 'antd'
import Color from 'color'
import { features_metadata } from 'fst/llm'
import { useTranslation } from 'react-i18next'

import { Icon, LLM, Modal } from '@/components'
import { confirm, splitLLMName } from '@/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import ModelForm from './ModelForm'

import styles from './index.module.css'

import type { FeaturesKey } from 'fst/llm'
import type { IPropsFormModelItem } from '../../types'

const { useFormInstance } = Form

const Index = (props: IPropsFormModelItem) => {
	const { item, group_index, model_index, remove } = props
	const { enabled, id, name, features } = item
	const [visible, { toggle }] = useToggle()
	const { setFieldValue, getFieldValue } = useFormInstance()
	const { t } = useTranslation()

	const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
		id: item.id,
		data: { index: model_index }
	})

	const { model, branch } = useMemo(() => splitLLMName(name), [name])

	const onRemove = useMemoizedFn(async () => {
		const res = await confirm({
			title: t('notice'),
			content: t('config_remove_confirm'),
			zIndex: 1000000,
			width: 300
		})

		if (!res) return

		remove(model_index)
	})

	return (
		<Fragment>
			<div
				className={$cx(
					'model_item border_box flex flex_column align_center clickable',
					!enabled && 'not_enabled'
				)}
				onClick={toggle}
				style={{ transform: CSS.Translate.toString(transform), transition }}
				ref={setNodeRef}
				{...attributes}
				{...listeners}
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
				<ModelForm
					{...{ item, group_index, model_index, onRemove, getFieldValue, setFieldValue }}
					onClose={toggle}
				></ModelForm>
			</Modal>
		</Fragment>
	)
}

export default $app.memo(Index)
