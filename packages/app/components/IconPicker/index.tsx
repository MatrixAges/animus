import { useState } from 'react'
import { Input, Popover } from 'antd'
import { observer } from 'mobx-react-lite'
import { container } from 'tsyringe'

import { useDelegate } from '@/hooks'
import { AtomIcon, MagnifyingGlassIcon, SmileyWinkIcon } from '@phosphor-icons/react'

import Model from './model'

import styles from './index.module.css'

import type { PropsWithChildren } from 'react'

const { Search } = Input

interface IProps extends PropsWithChildren {}

const Index = (props: IProps) => {
	const { children } = props
	const [x] = useState(container.resolve(Model))
	const ref = useDelegate(v => (x.type = v))

	const Content = (
		<div className={$cx('border_box', styles._local)}>
			<div className='types_wrap w_100 border_box flex align_center' ref={ref}>
				<div
					className={$cx(
						'type_item flex justify_center align_center clickit',
						x.type === 'icon' && 'active'
					)}
					data-key='icon'
				>
					<AtomIcon weight='bold'></AtomIcon>
					<span className='text'>Icon</span>
				</div>
				<span className='divider'></span>
				<div
					className={$cx(
						'type_item flex justify_center align_center clickit',
						x.type === 'emoji' && 'active'
					)}
					data-key='emoji'
				>
					<SmileyWinkIcon weight='bold'></SmileyWinkIcon>
					<span className='text'>Emoji</span>
				</div>
			</div>
			<div className='control_wrap flex flex_column w_100 border_box'>
				<Input
					className='input_search w_100 border_box'
					prefix={<MagnifyingGlassIcon />}
					onChange={x.onChange}
				/>
			</div>
			<div className='icon_items_wrap w_100'>
				<div className='icon_items w_100 border_box flex flex_wrap'>
					{Object.keys(x.icons).map((item, index) => (
						<div className='icon_item flex justify_center align_center' key={index}>
							<Choose>
								<When condition={x.type === 'icon'}>
									<i className={`ph ph-${item}`}></i>
								</When>
								<Otherwise>123</Otherwise>
							</Choose>
						</div>
					))}
				</div>
			</div>
		</div>
	)

	return (
		<Popover rootClassName={styles.popover} trigger={['click']} content={Content} open>
			{children}
		</Popover>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
