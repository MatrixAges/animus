import { Preferences, Update } from './components'

const Index = () => {
	return (
		<div className='w_100 flex flex_column'>
			<Preferences></Preferences>
			<Update></Update>
		</div>
	)
}

export default $app.memo(Index)
