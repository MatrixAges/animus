import { R2 } from 'node-cloudflare-r2'
import { createReadStream } from 'node:fs'
import { basename } from 'node:path'

import { version } from '../package.json'

const r2 = new R2({
	accountId: 'c3a5dce3f9e956aa17a57e04f435e121',
	accessKeyId: 'd2f64042b393e6672ab615c849bd54b9',
	secretAccessKey: 'fd709ab3625b11f3fbba2a8d46cf81352face09a859287cded57f9fe4e3a2620'
})

const bucket = r2.bucket('if-files')

const source_path_release = `${process.cwd()}/release/darwin`
const source_path_zip = `${process.cwd()}/zip/darwin`
const types = ['arm64', 'x64']
// const types = ['x64']
const targets = [] as Array<{ from: string; to: string }>

types.forEach(type => {
	targets.push(
		{ from: `${source_path_release}/x64/IF-${version}-${type}.dmg`, to: `release/darwin/${type}` },
		{ from: `${source_path_zip}/${type}/IF-${version}-${type}.zip`, to: `release/darwin/${type}` },
		{ from: `${source_path_zip}/${type}/latest-mac.yml`, to: `release/darwin/${type}` }
	)
})

const total = targets.length

let current = 0

for (const item of targets) {
	const { from, to } = item

	const stream = createReadStream(from)
	const filename = basename(from)

	const { objectKey } = await bucket.upload(stream, `${to}/${filename}`)

	current += 1

	console.log(`[${total}/${current}] ${objectKey.replace('release/darwin/', '')} <= ${filename}`)
}
