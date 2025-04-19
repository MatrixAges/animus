import { $ } from '@website/utils'

import type { AnchorHTMLAttributes } from 'react'

export const Index = ({ href, children }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<a href={href} target={href?.indexOf('#') !== -1 ? '_self' : '_blank'}>
		{children}
	</a>
)

export default $.memo(Index)
