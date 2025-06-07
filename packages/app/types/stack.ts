import { File } from './app'

export namespace Stack {
	export interface View extends File {
		active: boolean
	}

	export interface Column {
		views: Array<View>
		width: number
	}

	export type Columns = Array<Column>

	export interface Position {
		column: number
		view: number
	}
}
