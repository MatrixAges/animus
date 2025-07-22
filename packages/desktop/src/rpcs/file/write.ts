import to from 'await-to-js'
import { deepmerge } from 'deepmerge-ts'
import { any, boolean, object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	data: any(),
	merge: boolean().optional()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, data, merge } = input

	let target = data

	if (merge) {
		const [err, res] = await to(read({ module, filename }))

		if (!err && res) target = deepmerge(res, data)
	}

	await write({ module, filename, data: target })
})
