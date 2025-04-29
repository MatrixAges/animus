import Nav from './_Nav'
import styles from './layout.module.css'

import type { PropsWithChildren } from 'react'

export default async ({ children }: PropsWithChildren) => {
	return (
		<div className={styles._local}>
			<Nav></Nav>
			{children}
		</div>
	)
}
