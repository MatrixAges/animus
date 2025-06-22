import styles from './index.module.css'

const Index = () => {
	return <div className={$cx(styles._local)}></div>
}

export default $app.memo(Index)
