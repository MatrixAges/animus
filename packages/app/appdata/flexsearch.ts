import type { IndexOptions } from 'flexsearch'

export const index_options = {
	cache: 12,
	tokenize: 'full',
	context: { resolution: 9, depth: 3, bidirectional: true }
} as IndexOptions
