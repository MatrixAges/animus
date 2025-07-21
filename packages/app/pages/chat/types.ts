import { FileIndexs } from '@desktop/schemas'

import Model from './model'

export interface IPropsRecent {
	recent: FileIndexs
	setRecentItems: Model['setRecentItems']
	toggleListModal: Model['toggleListModal']
}

export interface IPropsList {
	list: FileIndexs
	setListItems: Model['setListItems']
	removeListItem: Model['removeListItem']
}
