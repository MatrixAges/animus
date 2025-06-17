import styles from './index.module.css'

import type { Icon } from '@phosphor-icons/react'
import type { PropsWithChildren, ReactNode } from 'react'

interface IProps extends PropsWithChildren {
	Icon: Icon
	title: ReactNode
	desc?: ReactNode
}

const Index = (props: IProps) => {
	const { children, Icon, title, desc } = props

	return (
		<div className={$cx('w_100 border_box flex justify_between align_center', styles._local)}>
			<div className='title_wrap flex align_center'>
				<Icon className={$cx(styles.setting_icon)} size={21}></Icon>
				<div className='text_wrap flex flex_column'>
					<span className={styles.title}>{title}</span>
					<If condition={desc}>
						<span className={styles.desc}>{desc}</span>
					</If>
				</div>
			</div>
			<div className='value_wrap flex align_center'>{children}</div>
		</div>
	)
}

export default $app.memo(Index)
