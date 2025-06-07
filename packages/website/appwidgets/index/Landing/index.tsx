'use client'

import { description, name, slogan } from '@website/appdata'
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
			<div className='flex flex_column align_center'>
				<h2 className='heading slogan'>{slogan}</h2>
				<h3 className='heading desc'>{description}</h3>
			</div>
			<Logo size={60}></Logo>
			<h1 className='name'>{name}</h1>
		</div>
	)
}

export default $.memo(Index)
