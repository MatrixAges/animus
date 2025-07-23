import { AnimatePresence, motion } from 'motion/react'

import type { MotionNodeAnimationOptions } from 'motion'
import type { PropsWithChildren } from 'react'

export interface IProps extends PropsWithChildren, Pick<MotionNodeAnimationOptions, 'initial' | 'animate' | 'exit'> {
	visible: boolean | null | undefined
	className?: string
}

const Index = (props: IProps) => {
	const { children, initial, animate, exit, visible, className } = props

	return (
		<AnimatePresence>
			<If condition={visible}>
				<motion.div
					className={className}
					initial={initial}
					animate={animate}
					exit={exit}
					transition={{ duration: 0.18, ease: 'easeInOut' }}
				>
					{children}
				</motion.div>
			</If>
		</AnimatePresence>
	)
}

export default $app.memo(Index)
