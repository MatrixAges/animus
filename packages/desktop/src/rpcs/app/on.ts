import { p } from '@desktop/utils'
import { observable } from '@trpc/server/observable'

type Res = { type: 'blur'; value: boolean } | { type: 'maximize'; value: boolean }

export default p.subscription(({ ctx }) =>
	observable<Res>(emit => {
		const onFocus = () => emit.next({ type: 'blur', value: false })
		const onBlur = () => emit.next({ type: 'blur', value: true })
		const onMaximize = () => emit.next({ type: 'maximize', value: ctx.win.isMaximized() })

		ctx.win.on('focus', onFocus)
		ctx.win.on('blur', onBlur)
		ctx.win.on('maximize', onMaximize)
		ctx.win.on('unmaximize', onMaximize)

		return () => {
			ctx.win.off('focus', onFocus)
			ctx.win.off('blur', onBlur)
			ctx.win.off('maximize', onMaximize)
			ctx.win.off('unmaximize', onMaximize)
		}
	})
)
