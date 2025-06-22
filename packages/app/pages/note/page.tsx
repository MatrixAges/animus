import { observer } from 'mobx-react-lite'

const Index = () => {
	return <div></div>
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
