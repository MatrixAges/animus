import type { Omnitable } from './types'

export const config = {
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
			{ name: 'Labels' },
			{ name: 'Title' },
			{ name: 'Status' },
			{ name: 'Priority' },
			{ name: 'Est. Hours' },
			{ name: 'Created At' }
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
				type: 'select',
				props: {
					options: [
						{
							label: 'Todo',
							value: 3
						},
						{
							label: 'In-progress',
							value: 2
						},
						{
							label: 'Done',
							value: 1
						},
						{
							label: 'Canceled',
							value: 0
						}
					]
				}
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
				bind: 'created_at',
				type: 'date'
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
