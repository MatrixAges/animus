import { writeFileSync } from 'fs'
import { join } from 'path'
import { Index } from 'flexsearch'

const output_path = join(process.cwd(), '/icons')

const indexes = new Index({
	cache: 100,
	tokenize: 'full',
	context: { resolution: 9, depth: 3, bidirectional: true }
})

const generateIndexes = async (lang: 'en' | 'zh-cn') => {
	const icons = await import(`../icons/${lang}/icons`)
	const emojis = await import(`../icons/${lang}/emojis`)

	Object.keys(icons).forEach(key => {
		const tags = (icons as Record<string, string[]>)[key]

		tags.push(key)
		tags.forEach(item => indexes.add(key, item))
	})

	Object.keys(emojis).forEach(key => {
		const tags = (icons as Record<string, string[]>)[key]

		tags.forEach(item => indexes.add(key, item))
	})

	const export_index = {} as Record<string, any>

	indexes.export((id, value) => {
		if (value) {
			export_index[id] = value
		}
	})

	writeFileSync(join(output_path, `/${lang}/indexes`), JSON.stringify(export_index))
}

generateIndexes('en')
generateIndexes('zh-cn')
