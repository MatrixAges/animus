'use client'

import { $ } from '@website/utils'

import { WarningIcon } from '@phosphor-icons/react'
import katex from 'katex'
import { useLayoutEffect, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import type { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
	inline?: boolean
}

const Index = (props: IProps) => {
	const { children, inline } = props
	const ref = useRef(null)

	useLayoutEffect(() => {
		katex.render(children as string, ref.current!, {
			displayMode: !inline,
			errorColor: 'var(--color_danger)',
			output: 'html',
			strict: 'warn',
			throwOnError: false,
			trust: false
		})
	}, [children, inline])

	return (
		<ErrorBoundary
			fallback={
				<div>
					<WarningIcon size={18}></WarningIcon>
				</div>
			}
		>
			{inline ? (
				<span className='math_wrap inline' ref={ref} spellCheck={false} tabIndex={-1} />
			) : (
				<div
					className='math_wrap md_block w_100 text_center border_box justify_center'
					ref={ref}
					spellCheck={false}
					tabIndex={-1}
				/>
			)}
		</ErrorBoundary>
	)
}

export default $.memo(Index)
