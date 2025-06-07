import type { FlatObject, NestedObject } from '@/types'

const Index = <T extends NestedObject>(input: T, prefix?: string): FlatObject<T> => {
	return Object.entries(input).reduce((acc, [key, value]) => {
		const new_key = prefix ? `${prefix}.${key}` : key

		;(acc as Record<string, unknown>)[key] =
			typeof value === 'object' ? Index(value as NestedObject, new_key) : new_key

		return acc
	}, {} as FlatObject<T>)
}

export default Index
