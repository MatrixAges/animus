import type { Icon } from '@/types'

interface IProps {
	id: Icon
	size?: number | string
}

const Index = (props: IProps) => {
	const { id, size } = props

	return <i className={`ph ph-${id}`} style={{ fontSize: size }}></i>
}

export default $app.memo(Index)
