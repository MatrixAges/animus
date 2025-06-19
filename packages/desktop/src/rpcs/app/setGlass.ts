import { boolean, object } from 'zod'

import { conf, p, setWindowGlass } from '@desktop/utils'

const input_type = object({ glass: boolean() })

export default p.input(input_type).mutation(async ({ input, ctx }) => {
	const { glass } = input

	if (conf.get('glass') === glass) return

	setWindowGlass(ctx.win, glass)

	conf.set('glass', glass)
})
