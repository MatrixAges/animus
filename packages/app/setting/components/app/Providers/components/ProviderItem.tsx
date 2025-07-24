import { Switch } from 'antd'

import { ProviderIcon } from '@/components'
import { useScrollToItem } from '@/hooks'

interface IProps {
	id: string
	active?: boolean
}

const Index = (props: IProps) => {
	const { id, active } = props

	useScrollToItem(id, active)

	return (
		<div
			className={$cx(
				'provider border_box flex flex_column align_center relative cursor_point',
				active && 'active'
			)}
			data-key={id}
		>
			<div className='icon_wrap flex'>
				<ProviderIcon name={id}></ProviderIcon>
			</div>
			<div className='name text_center flex flex_column'>
				{id.split('_').map(item => (
					<span key={item}>{item}</span>
				))}
			</div>
			<Switch className='switch absolute' size='small'></Switch>
		</div>
	)
}

export default $app.memo(Index)
