'use client'

import { slogan } from '@website/appdata'
import { Logo } from '@website/components'
import { $ } from '@website/utils'

import styles from './index.module.css'

const Index = () => {
	return (
		<div
			className={$.cx(
				'fixed top_0 w_100vw h_100vh border_box flex flex_column align_center justify_center',
				styles._local
			)}
		>
			<h2 className='slogan'>{slogan}</h2>
			<Logo size={60}></Logo>
			<h1 className='name'>Animus</h1>
		</div>
	)
}

export default $.memo(Index)
