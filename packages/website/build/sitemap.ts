import { writeFileSync } from 'fs'
import dayjs from 'dayjs'
import { globSync } from 'tinyglobby'

const links = [] as Array<string>
const app_dir = `${process.cwd()}/app`
const public_dir = `${process.cwd()}/public`
const paths = globSync(['**/page.tsx'], { cwd: app_dir })
const dynamics = [] as Array<string>

paths.forEach(item => {
	if (item.indexOf('id]') !== -1) {
		dynamics.push(item.split('/')[0])
	} else {
		if (item === 'page.tsx') {
			links.push('/')
		} else {
			links.push(`/${item.replace('/page.tsx', '')}`)
		}
	}
})

dynamics.forEach(item => {
	const mds = globSync(['**/en.md'], { cwd: `${public_dir}/${item}` })

	mds.forEach(md => {
		links.push(`/${item}/${md.replace('/en.md', '')}`)
	})
})

const urls = links.reduce((total, item) => {
	total += `
      <url>
            <loc>https://if.openages.com${item}</loc>
            <lastmod>${dayjs().format('YYYY-MM-DD')}</lastmod>
            <priority>1.0</priority>
      </url>`

	return total
}, '')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
      ${urls}
</urlset>
`

writeFileSync(`${public_dir}/sitemap.xml`, sitemap)
