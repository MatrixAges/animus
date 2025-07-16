import { join } from 'path'
import { remove } from 'fs-extra'
import { array, object, string } from 'zod'

import { app_data_path, p } from '@desktop/utils'

const input_type = object({
	items: array(string())
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { items } = input

	await Promise.all([items.map(item => remove(join(app_data_path, `/${item}`)))])
})
