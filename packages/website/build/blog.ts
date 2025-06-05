import { statSync, writeFileSync } from 'fs'
import { join } from 'path'
import dayjs from 'dayjs'
import { globSync } from 'tinyglobby'

const docs_dir = `${process.cwd()}/public/blog`
const output_path = join(process.cwd(), `/appmeta`)

const mds = globSync(['**/en.md', '!example/en.md'], { cwd: docs_dir })

const target = [] as Array<{ id: string; date: string }>

mds.forEach(item => {
	target.push({
		id: item.replace('/en.md', ''),
		date: dayjs(statSync(`${process.cwd()}/public/blog/${item}`).mtime).format('YYYY-MM-DD')
	})
})

writeFileSync(`${output_path}/blog.ts`, `export default ${JSON.stringify(target, null, 6)}`)
