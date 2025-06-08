import { useMemoizedFn } from 'ahooks'
import { observer } from 'mobx-react-lite'

import { useGlobal } from '@/context'
import { ipc } from '@/utils'
import { CopyIcon, MinusIcon, SquareIcon, XIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const Index = () => {
	const global = useGlobal()

	const minimize = useMemoizedFn(() => ipc.app.actions.query({ type: 'minimize' }))
	const maximize = useMemoizedFn(() => ipc.app.actions.query({ type: 'maximize' }))
	const close = useMemoizedFn(() => ipc.app.actions.query({ type: 'close' }))

	return (
		<div className={$cx('flex no_drag', styles._local)}>
			<div className='win_option h_100 flex justify_center align_center' onClick={minimize}>
				<MinusIcon weight='bold'></MinusIcon>
			</div>
			<div className='win_option h_100 flex justify_center align_center' onClick={maximize}>
				{global.layout.maximize ? (
					<CopyIcon weight='bold'></CopyIcon>
				) : (
					<SquareIcon weight='bold'></SquareIcon>
				)}
			</div>
			<div className='win_option h_100 flex justify_center align_center' onClick={close}>
				<XIcon size={15} weight='bold'></XIcon>
			</div>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
