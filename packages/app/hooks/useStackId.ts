import { useStack } from '@/context/stack'

export default () => {
	const { id } = useStack()

	return id
}
