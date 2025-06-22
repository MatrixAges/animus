export interface IProps {
	className?: string
	shortcodes: string
	size?: number
}

const Index = (props: IProps) => {
	const { className, shortcodes, size } = props

	return <em-emoji className={$cx(className)} shortcodes={shortcodes} size={`${size}px`}></em-emoji>
}

export default $app.memo(Index)
