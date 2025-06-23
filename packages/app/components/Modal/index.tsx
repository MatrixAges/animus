import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useClickAway } from 'ahooks'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'

import { XIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { MouseEvent, ReactNode } from 'react'

export interface IProps {
	children: ReactNode
	open: boolean
	className?: HTMLDivElement['className']
	mask_class_name?: HTMLDivElement['className']
	title?: string | number
	width?: string | number
	min_height?: string | number
	height?: string | number
	mask_closable?: boolean
	z_index?: number
	header?: (onClose: IProps['onClose']) => ReactNode
	onClose?: (e?: MouseEvent<HTMLElement>) => void
	getContainer?: () => Element
	getRef?: (v: HTMLDivElement) => void
}

const Index = (props: IProps) => {
	const {
		children,
		open,
		className,
		mask_class_name,
		title,
		width,
		min_height,
		height,
		mask_closable,
		z_index,
		header,
		onClose,
		getContainer,
		getRef
	} = props
	const ref_content_wrap = useRef<HTMLDivElement>(null)
	const ref_content = useRef<HTMLDivElement>(null)
	const [on_body, setOnbody] = useState(false)
	const [exsit, setExsit] = useState(false)

	const container = getContainer?.() || document.body

	useEffect(() => {
		if (open) {
			setExsit(true)

			document.body.style.setProperty('overflow-y', 'hidden')

			const handle_hash_change = () => onClose?.()

			window.addEventListener('popstate', handle_hash_change)

			return () => {
				window.removeEventListener('popstate', handle_hash_change)
			}
		} else {
			const timer = setTimeout(() => {
				setExsit(false)
			}, 180)

			document.body.style.removeProperty('overflow-y')

			return () => clearTimeout(timer)
		}
	}, [open])

	useClickAway(e => {
		if (!mask_closable) return
		if (e.target !== ref_content_wrap.current) return

		onClose?.(e as unknown as MouseEvent<HTMLDivElement>)
	}, ref_content)

	useEffect(() => {
		setOnbody(container === document.body)
	}, [container])

	const Header = useMemo(() => {
		if (header) return header(onClose)
		if (!title) return null

		return (
			<div className={$cx(styles.header, 'w_100 border_box flex justify_between align_center')}>
				<span className='title'>{title}</span>
				<span className='btn_close flex justify_center align_center clickable' onClick={onClose}>
					<XIcon size={14}></XIcon>
				</span>
			</div>
		)
	}, [title, onClose, header])

	if (!exsit) return null

	const Content = (
		<Fragment>
			<AnimatePresence>
				{open && (
					<motion.div
						className={$cx(
							styles.mask,
							on_body && styles.on_body,
							mask_class_name,
							'w_100 h_100 no_drag'
						)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18, ease: 'easeInOut' }}
						style={{ zIndex: z_index ?? 1001 }}
					></motion.div>
				)}
			</AnimatePresence>
			{exsit && (
				<div
					className={$cx(
						styles.content_wrap,
						on_body && styles.on_body,
						'modal_wrap w_100 h_100 border_box flex align_center no_drag'
					)}
					ref={ref_content_wrap}
					style={{ zIndex: z_index ? z_index + 1 : 1002 }}
				>
					{
						<AnimatePresence>
							{open && (
								<motion.div
									className={$cx(
										'modal_content border_box flex flex_column',
										styles.content,
										className
									)}
									ref={ref_content}
									initial={{
										transform: 'translate3d(0px, -30px, 0px)',
										opacity: 0
									}}
									animate={{ transform: 'translate3d(0px, 0px, 0px)', opacity: 1 }}
									exit={{ transform: 'translate3d(0px, 30px, 0px)', opacity: 0 }}
									transition={{ duration: 0.18, ease: 'easeInOut' }}
									style={{
										width: width ?? 360,
										min_height,
										...(height ? { height, overflowY: 'scroll' } : {})
									}}
								>
									{Header}
									<div
										className={$cx(
											'modal_body w_100 border_box flex',
											styles.body,
											Header && styles.has_header
										)}
										ref={getRef}
									>
										{children}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					}
				</div>
			)}
		</Fragment>
	)

	if (container) {
		return createPortal(Content, container)
	}

	return Content
}

export default $app.memo(Index)
