import * as React from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

export type LexicalErrorBoundaryProps = {
	children: React.JSX.Element
	onError: (error: Error) => void
}

export function LexicalErrorBoundary({ children, onError }: LexicalErrorBoundaryProps): React.JSX.Element {
	return (
		<ReactErrorBoundary
			fallback={
				<div
					style={{
						border: '1px solid #f00',
						color: '#f00',
						padding: '8px'
					}}
				>
					An error was thrown.
				</div>
			}
			onError={onError}
		>
			{children}
		</ReactErrorBoundary>
	)
}

/** @deprecated use the named export {@link LexicalErrorBoundary} */
// eslint-disable-next-line no-restricted-exports
export default LexicalErrorBoundary
