import type { Icon } from '@phosphor-icons/react'
import type { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
	Icon: Icon
	title: string
	desc?: string
}

const Index = (props: IProps) => {
	const { children, Icon, title, desc } = props

	return (
		<div className='setting_item w_100 border_box flex justify_between align_center'>
			<div className='title_wrap flex align_center'>
				<Icon size={24}></Icon>
				<div className='text_wrap flex flex_column'>
					<span className='title'>{title}</span>
					<If condition={desc}>
						<span className='desc'>{desc}</span>
					</If>
				</div>
			</div>
			<div className='value_wrap flex align_center'>{children}</div>
		</div>
	)
}

export default $app.memo(Index)
