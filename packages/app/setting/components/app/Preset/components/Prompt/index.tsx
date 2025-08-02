import { ModelSelect } from '@/components'

import styles from './index.module.css'

import type { IPropsPrompt } from '../../types'

const Index = (props: IPropsPrompt) => {
	const { prompts, setPrompts } = props

	return (
		<div className={$cx(styles._local)}>
			<ModelSelect></ModelSelect>
		</div>
	)
}

export default $app.memo(Index)
