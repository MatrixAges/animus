import type { Omnitable } from './types'

export const config = {
	primary: 'id',
	actions: {
		baseurl: '',
		query: ''
	},
	filter: {
		columns: [
			{ name: 'Title' },
			{ name: 'Status' },
			{ name: 'Labels' },
			{ name: 'Priority' },
			{ name: 'Est. Hours' },
			{ name: 'Created At' }
		]
	},
	table: {
		columns: [
			{ name: 'Task', readonly: true },
			{ name: 'Priority' },
			{ name: 'Title', width: 540 },
			{ name: 'Labels' },
			{ name: 'Status' },
			{ name: 'Est. Hours', width: 90 },
			{ name: 'Created At', width: 150 },
			{ name: 'Operation' }
		]
	},
	fields: {
		common: {
			Title: {
				bind: 'title',
				type: 'input'
			},
			Status: {
				bind: 'status',
				type: 'status',
				props: {}
			},
			Labels: {
				bind: 'labels',
				type: 'select',
				props: {
					options: ['Bug', 'Feature', 'Improvement']
				}
			},
			Priority: {
				bind: 'priority',
				type: 'priority',
				props: {}
			},
			'Est. Hours': {
				bind: 'estimatedHours',
				type: 'input_number',
				props: {}
			},
			'Created At': {
				bind: 'createdAt',
				type: 'date_picker'
			},
			Operation: {
				bind: '_',
				type: 'operation'
			}
		},
		filter: {},
		table: {
			Task: {
				bind: 'id',
				type: 'text'
			}
		}
	}
} as Omnitable.Config
