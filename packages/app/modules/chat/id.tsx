import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { container } from 'tsyringe'

import { Chatbox } from '@/components'
import { useStackEffect } from '@/hooks'

import Model from './model'

import styles from './index.module.css'

import type { IPropsChatbox } from '@/components'
import type { Stack } from '@/types'

const Index = (props: Stack.ModuleProps) => {
	const { id } = props
	const [x] = useState(container.resolve(Model))

	const { bind } = useStackEffect({
		mounted: () => x.init({ id }),
		unmounted: () => x.off(),
		deps: [id]
	})

	const props_chatbox: IPropsChatbox = {}

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)} ref={bind}>
			123
			{/* <Chatbox {...props_chatbox}></Chatbox> */}
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
