import { dirname } from 'path'
import { fileURLToPath } from 'url'

if (typeof __dirname === 'undefined') {
	global.__filename = fileURLToPath(import.meta.url)
	global.__dirname = dirname(__filename)
}
