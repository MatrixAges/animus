import { useMemoizedFn } from 'ahooks'
import { Switch } from 'antd'

import { ProviderIcon } from '@/components'
import { useScrollToItem } from '@/hooks'

import type { ProviderKey } from 'fst/llm'

interface IProps {
	id: ProviderKey
	enabled: boolean
	active?: boolean
	enableProvider: (name: ProviderKey, v: boolean) => void
}

const Index = (props: IProps) => {
	const { id, enabled, active, enableProvider } = props

	useScrollToItem(id, active)

	const onChangeEnabled = useMemoizedFn(v => enableProvider(id, v))

	return (
		<div
			className={$cx(
				'provider border_box flex flex_column align_center relative cursor_point',
				enabled && 'enabled',
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
			<Switch
				className='switch absolute'
				size='small'
				checked={enabled}
				onChange={onChangeEnabled}
			></Switch>
		</div>
	)
}

export default $app.memo(Index)
