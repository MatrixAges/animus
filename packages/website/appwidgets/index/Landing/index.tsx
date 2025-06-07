'use client'

import { name, slogan_0, slogan_1 } from '@website/appdata'
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
			<div className='slogan_wrap flex flex_column'>
				<h2 className='slogan slogan_0'>{slogan_0}</h2>
				<h2 className='slogan slogan_1'>{slogan_1}</h2>
			</div>
			<Logo size={60}></Logo>
			<h1 className='name'>{name}</h1>
		</div>
	)
}

export default $.memo(Index)
