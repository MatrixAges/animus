import { customAlphabet } from 'nanoid'

const Index = () => {
	return (
		customAlphabet('abcdefghijklmnopqrstuvwxyz', 15)() +
		customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789_-', 15)()
	)
}

export const getIds = (counts: number) => {
	const arr = Array.from({ length: counts })

	return arr.reduce((total: Array<string>) => {
		total.push(Index())

		return total
	}, []) as Array<string>
}

export default Index
