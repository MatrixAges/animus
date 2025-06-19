import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useClickAway } from 'ahooks'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'

import { XIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { CSSProperties, MouseEvent, ReactNode } from 'react'

export interface IProps {
	children: ReactNode
	open: boolean
	placement?: 'left' | 'right' | 'top' | 'bottom'
	class_name?: HTMLDivElement['className']
	mask_class_name?: HTMLDivElement['className']
	title?: string | number
	width?: string | number
	height?: string | number
	mask_closable?: boolean
	z_index?: number
	header?: (onClose: IProps['onClose']) => ReactNode
	onClose?: (e?: MouseEvent<HTMLElement>) => void
	getRef?: (v: HTMLElement | null) => void
}

const Index = (props: IProps) => {
	const {
		children,
		open,
		placement = 'left',
		class_name,
		mask_class_name,
		title,
		width,
		height,
		mask_closable,
		z_index,
		header,
		onClose,
		getRef
	} = props
	const ref_content_wrap = useRef<HTMLDivElement>(null)
	const ref_content = useRef<HTMLDivElement>(null)
	const [exsit, setExsit] = useState(false)

	useEffect(() => {
		if (open) {
			setExsit(true)

			document.body.setAttribute('data-scroll-locked', '1')

			const handle_hash_change = () => onClose?.()

			window.addEventListener('popstate', handle_hash_change)

			return () => {
				window.removeEventListener('popstate', handle_hash_change)
			}
		} else {
			const timer = setTimeout(() => {
				setExsit(false)
			}, 180)

			document.body.removeAttribute('data-scroll-locked')

			return () => clearTimeout(timer)
		}
	}, [open])

	useClickAway(e => {
		if (!mask_closable) return
		if (e.target !== ref_content_wrap.current) return

		onClose?.(e as unknown as MouseEvent<HTMLDivElement>)
	}, ref_content)

	const { align, transform, style } = useMemo(() => {
		switch (placement) {
			case 'left':
				return {
					style: { width: width ?? 300 } as CSSProperties,
					transform: 'translate3d(-100%, 0px, 0px)'
				}
			case 'right':
				return {
					align: 'justify_end',
					style: { width: width ?? 300 } as CSSProperties,
					transform: 'translate3d(100%, 0px, 0px)'
				}
			case 'top':
				return {
					style: { width: '100%', height: height ?? 300 } as CSSProperties,
					transform: 'translate3d(0px, -100%, 0px)'
				}
			case 'bottom':
				return {
					align: 'align_end',
					style: { width: '100%', height: height ?? 300 } as CSSProperties,
					transform: 'translate3d(0px, 100%, 0px)'
				}
		}
	}, [placement, width, height])

	const Header = useMemo(() => {
		if (header) return header(onClose)
		if (!title) return null

		return (
			<div className={$cx(styles.header, 'w_100 border_box flex justify_between align_center relative')}>
				<span className='title'>{title}</span>
				<span className='btn_close flex justify_center align_center clickable' onClick={onClose}>
					<XIcon size={16}></XIcon>
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
						className={$cx(styles.mask, styles.on_body, mask_class_name, 'w_100 h_100')}
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
						styles.on_body,
						align,
						class_name,
						'modal_wrap w_100 h_100 border_box flex'
					)}
					ref={ref_content_wrap}
					style={{ zIndex: z_index ? z_index + 1 : 1002 }}
				>
					<AnimatePresence>
						{open && (
							<motion.div
								className={$cx(
									styles.content,
									'modal_content border_box flex flex_column'
								)}
								initial={{ transform }}
								animate={{ transform: 'translate3d(0px, 0px, 0px)' }}
								exit={{ transform }}
								transition={{ duration: 0.18, ease: 'easeInOut' }}
								style={style}
								ref={ref_content}
							>
								{Header}
								<div
									className={$cx(
										styles.body,
										'modal_body w_100 border_box flex flex_column'
									)}
									ref={getRef}
								>
									{children}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			)}
		</Fragment>
	)

	return createPortal(Content, document.body)
}

export default $app.memo(Index)
