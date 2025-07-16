import { useLayoutEffect, useState } from 'react'
import { Input, Popover } from 'antd'
import { debounce } from 'es-toolkit/compat'
import { observer } from 'mobx-react-lite'
import { container } from 'tsyringe'

import { useDelegate } from '@/hooks'
import { AtomIcon, MagnifyingGlassIcon, SmileyWinkIcon, TrashIcon } from '@phosphor-icons/react'

import LoadingCircle from '../LoadingCircle'
import Model from './model'

import styles from './index.module.css'

import type { TooltipPlacement } from 'antd/es/tooltip'
import type { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
	type?: 'icon' | 'emoji' | 'all'
	placement?: TooltipPlacement
	zIndex?: number
	hide_arrow?: boolean
	onSelect: (v: string, type: 'icon' | 'emoji') => void
}

const Index = (props: IProps) => {
	const { type = 'all', placement, zIndex, hide_arrow, onSelect, children } = props
	const [x] = useState(container.resolve(Model))

	useLayoutEffect(() => {
		if (type !== 'all') x.type = type

		x.init()

		return () => x.off()
	}, [type])

	const ref_type = useDelegate(v => x.onChangeType(v), { visible: x.visible })

	const ref_icons = useDelegate(
		v => {
			onSelect(v, x.type)

			if (x.type === 'icon') {
				x.lru_icons.set(v)
			} else {
				x.lru_emojis.set(v)
			}
		},
		{ visible: x.visible }
	)

	const Content = (
		<div className={$cx('border_box ', styles._local)}>
			<div className='input_search_wrap flex flex_column w_100 border_box'>
				<Input
					className='input_search w_100 border_box'
					allowClear
					prefix={<MagnifyingGlassIcon />}
					onCompositionStart={() => (x.compositing = true)}
					onCompositionEnd={() => (x.compositing = false)}
					onChange={debounce(x.onChangeInput, 360)}
				/>
			</div>
			<div className={$cx('icon_items_wrap w_100 relative', type !== 'all' && 'not_all')} ref={ref_icons}>
				<Choose>
					<When condition={x.loading}>
						<div className='loading_wrap w_100 h_100 absolute top_0 left_0 flex justify_center align_center'>
							<LoadingCircle></LoadingCircle>
						</div>
					</When>
					<Otherwise>
						<div className='w_100 flex flex_column'>
							<If condition={x.recent.length}>
								<div className='recent_items_wrap w_100 border_box'>
									<div className='header_wrap flex justify_between align_center'>
										<span className='title'>Recent</span>
										<TrashIcon
											className='clickable'
											onClick={x.clearRecent}
										></TrashIcon>
									</div>
									<div className='recent_items w_100 border_box flex flex_wrap'>
										{x.recent.map((item, index) => (
											<div
												className='icon_item flex justify_center align_center'
												data-key={item}
												key={index}
											>
												<Choose>
													<When condition={x.type === 'icon'}>
														<i className={`ph ph-${item}`}></i>
													</When>
													<Otherwise>{item}</Otherwise>
												</Choose>
											</div>
										))}
									</div>
								</div>
							</If>
							<div className={$cx('icon_items w_100 border_box flex flex_wrap', x.signal)}>
								{x.icons.map((item, index) => (
									<div
										className='icon_item flex justify_center align_center'
										data-key={item}
										key={index}
									>
										<Choose>
											<When condition={x.type === 'icon'}>
												<i className={`ph ph-${item}`}></i>
											</When>
											<Otherwise>{item}</Otherwise>
										</Choose>
									</div>
								))}
							</div>
						</div>
					</Otherwise>
				</Choose>
			</div>
			<If condition={type === 'all'}>
				<div className='types_wrap w_100 border_box flex align_center' ref={ref_type}>
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
			</If>
		</div>
	)

	return (
		<Popover
			rootClassName={styles.popover}
			trigger={['click']}
			placement={placement}
			zIndex={zIndex || 600}
			arrow={hide_arrow ? false : undefined}
			content={Content}
			onOpenChange={x.onOpenChange}
		>
			{children}
		</Popover>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
