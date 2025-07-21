import { join } from 'path'
import { remove } from 'fs-extra'
import { object, string } from 'zod'

import { p, read, workspace_data_path, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	id: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, id } = input

	const list = (await read({ module, filename })) || {}

	delete list[id]

	write({ module, filename, data: list })

	if (module !== 'global') {
		remove(join(workspace_data_path, '/file_index', `/${id}.json`))
	}
})
