import { Fragment } from 'react'
import { Form } from 'antd'

import styles from './index.module.css'

import type { Icon } from '@phosphor-icons/react'
import type { PropsWithChildren, ReactNode } from 'react'

interface IProps extends PropsWithChildren {
	Icon: Icon
	title: ReactNode
	name?: string
	desc?: ReactNode
	extra?: ReactNode
	pure?: boolean
}

const { Item } = Form

const Index = (props: IProps) => {
	const { children, Icon, title, name, desc, extra, pure } = props

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
			<div className='value_wrap flex align_center'>
				{extra}
				<Choose>
					<When condition={pure}>{children}</When>
					<Otherwise>
						<Item name={name} noStyle>
							{children}
						</Item>
					</Otherwise>
				</Choose>
			</div>
		</div>
	)
}

export default $app.memo(Index)
