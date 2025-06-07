import { Loader2 } from 'lucide-react'

import styles from './index.module.css'

export interface IProps {
	class_name?: HTMLDivElement['className']
	size?: number
	color?: string
}

const Index = (props: IProps) => {
	const { class_name, size = 24, color = 'var(--color_text)' } = props

	return (
		<div className={$cx('flex', styles._local, class_name)} style={{ width: size, height: size }}>
			<Loader2 className='w_100 h_100' strokeWidth={2.1} color={color}></Loader2>
		</div>
	)
}

export default $app.memo(Index)
