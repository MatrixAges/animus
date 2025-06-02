'use client'

import { useSize, useTheme } from '@website/hooks'
import { $, mermaidRender } from '@website/utils'

import { WarningIcon } from '@phosphor-icons/react'
import { useLayoutEffect, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import type { PropsWithChildren } from 'react'

const Index = (props: PropsWithChildren) => {
	const { children } = props
	const { theme } = useTheme()
	const ref = useRef(null)
	const width = useSize(() => ref.current!, 'width') as number

	useLayoutEffect(() => {
		mermaidRender({ content: children as string, container: ref.current!, theme, width })
	}, [children, theme, width])

	return (
		<ErrorBoundary
			fallback={
				<div>
					<WarningIcon size={18}></WarningIcon>
				</div>
			}
		>
			<div
				className='mermaid_wrap md_block w_100 text_center border_box justify_center'
				ref={ref}
				role='button'
				spellCheck={false}
				tabIndex={-1}
			/>
		</ErrorBoundary>
	)
}

export default $.memo(Index)
