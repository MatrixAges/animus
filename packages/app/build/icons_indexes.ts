import { join } from 'path'
import { Index } from 'flexsearch'
import { writeFile } from 'fs-extra'
import { compressToBase64 } from 'lz-string'

import { index_options } from '@/appdata/flexsearch'

const output_path = join(process.cwd(), '/icons')

const generateIndexes = async (lang: 'en' | 'zh-cn', type: 'icons' | 'emojis') => {
	const { default: data } = await import(`../icons/${lang}/${type}`)

	const indexes = new Index(index_options)

	Object.keys(data).forEach(key => {
		const tags = [...data[key]]

		if (type === 'icons') tags.unshift(key)

		indexes.add(key, tags.join(' '))
	})

	const export_index = {} as Record<string, any>

	indexes.export((id, value) => {
		if (value) {
			export_index[id] = value
		}
	})

	writeFile(join(output_path, `/${lang}/${type}.index`), compressToBase64(JSON.stringify(export_index)))
}

generateIndexes('en', 'icons')
generateIndexes('en', 'emojis')
generateIndexes('zh-cn', 'icons')
generateIndexes('zh-cn', 'emojis')
