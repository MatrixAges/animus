import { EventEmitter, on } from 'events'

import { p } from '@desktop/utils'

type Res = { type: 'blur'; value: boolean } | { type: 'maximize'; value: boolean }

const event = new EventEmitter()
const { emit } = event

export default p.subscription(async function* (args) {
	const { ctx, signal } = args

	const onFocus = () => emit('CHANGE', { type: 'blur', value: false })
	const onBlur = () => emit('CHANGE', { type: 'blur', value: true })
	const onMaximize = () => emit('CHANGE', { type: 'maximize', value: ctx.win.isMaximized() })

	ctx.win.on('focus', onFocus)
	ctx.win.on('blur', onBlur)
	ctx.win.on('maximize', onMaximize)
	ctx.win.on('unmaximize', onMaximize)

	try {
		for await (const [data] of on(event, 'CHANGE', { signal })) {
			yield data as Res
		}
	} finally {
		ctx.win.off('focus', onFocus)
		ctx.win.off('blur', onBlur)
		ctx.win.off('maximize', onMaximize)
		ctx.win.off('unmaximize', onMaximize)
	}
})
