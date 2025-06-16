import { observer } from 'mobx-react-lite'

const Index = () => {
	return <div>123</div>
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
