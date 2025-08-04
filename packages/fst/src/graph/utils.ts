export const SEP = '\x00'

export const key_map = {
	s: 'subject',
	p: 'predicate',
	o: 'object'
} as const

export const isVariable = (term: string) => term.startsWith('?')
