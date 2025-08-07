import { useState } from 'react'
import { DefaultChatTransport } from 'ai'
import { observer } from 'mobx-react-lite'
import { container } from 'tsyringe'

import { Chatbox } from '@/components'
import { useStackEffect } from '@/hooks'
import { useChat } from '@ai-sdk/react'

import Model from './model'

import styles from './index.module.css'

import type { IPropsChatbox } from '@/components'
import type { Stack } from '@/types'

const controller = new AbortController()
const signal = controller.signal

const Index = (props: Stack.ModuleProps) => {
	const { id } = props
	const [x] = useState(container.resolve(Model))
	const [input, setInput] = useState('')

	const { messages, sendMessage } = useChat({
		transport: new DefaultChatTransport({
			api: `http://localhost:${window.$port}/api/chat`
		})
	})

	const { bind } = useStackEffect({
		mounted: () => x.init({ id }),
		unmounted: () => x.off(),
		deps: [id]
	})

	const props_chatbox: IPropsChatbox = {}

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)} ref={bind}>
			<div className='w_100 flex flex_column'>
				{messages.map(message => (
					<div key={message.id} className='whitespace-pre-wrap'>
						{message.role === 'user' ? 'User: ' : 'AI: '}
						{message.parts.map((part, i) => {
							switch (part.type) {
								case 'text':
									return <div key={`${message.id}-${i}`}>{part.text}</div>
							}
						})}
					</div>
				))}

				<form
					onSubmit={e => {
						e.preventDefault()
						sendMessage({ text: input })
						setInput('')
					}}
				>
					<input
						className='fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl'
						value={input}
						placeholder='Say something...'
						onChange={e => setInput(e.currentTarget.value)}
					/>
				</form>
			</div>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
