import { emitter_verify } from '@electron/services'
import { p } from '@electron/utils'
import { observable } from '@trpc/server/observable'

export default p.subscription(() =>
	observable<boolean>(emit => {
		const handler = (v: boolean) => emit.next(v)

		emitter_verify.on('res', handler)

		return () => emitter_verify.off('res', handler)
	})
)
