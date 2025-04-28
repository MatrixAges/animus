import { readFileSync, writeFileSync } from 'fs'

const layout_path = `${process.cwd()}/app/layout.tsx`

let layout = readFileSync(layout_path).toString()

const env_type = process.env.TYPE as 'dev' | 'prod'

if (env_type === 'dev') {
	if (layout.indexOf(`// export const runtime = 'edge'`) === -1) {
		layout = layout.replace(`export const runtime = 'edge'`, `// export const runtime = 'edge'`)
	}
} else {
	layout = layout.replace(`// export const runtime = 'edge'`, `export const runtime = 'edge'`)
}

writeFileSync(layout_path, layout)
