import { observer } from 'mobx-react-lite'
import { local } from 'stk/storage'

import { useGlobal } from '@/context'

export interface IProps {
	class_name?: HTMLDivElement['className']
	size?: number
	color?: string
}

const Index = (props: IProps) => {
	const global = useGlobal()
	const is_dark = (global?.setting?.theme || local.theme) === 'dark'
	const { class_name, size = 48, color = is_dark ? 'var(--color_text)' : 'var(--color_main)' } = props

	return (
		<div className={$cx('flex', class_name)} style={{ width: size, height: size }}>
			<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
				<path
					d='M193.287,165.279c27.713-48,96.994-48,124.707,0l70.151,121.5c27.713,48-6.928,108-62.354,108H185.49c-55.426,0-90.067-60-62.353-108Z'
					fill-rule='evenodd'
					fill={color}
				/>
			</svg>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
