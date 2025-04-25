import type { Omnitable } from './types'

export const config = {
	name: 'omnitable_test_table',
	primary: 'id',
	actions: {
		baseurl: '',
		query: '',
		create: '',
		update: '',
		delete: ''
	},
	filter: {
		columns: [
			{ name: 'Title', datatype: 'string' },
			{ name: 'Status', datatype: 'array' },
			{ name: 'Labels', datatype: 'array' },
			{ name: 'Priority', datatype: 'array' },
			{ name: 'Est. Hours', datatype: 'number' },
			{ name: 'Created At', datatype: 'date' }
		]
	},
	table: {
		columns: [
			{ name: 'Task', readonly: true, sticky: true },
			{ name: 'Priority', sort: true },
			{ name: 'Title', width: 540, span: 24 },
			{ name: 'Labels' },
			{ name: 'Status', sort: true },
			{ name: 'Est. Hours', width: 72, sort: true },
			{ name: 'Created At', width: 150, readonly: true, sort: true },
			{ name: 'Operation' }
		]
	},
	fields: {
		common: {
			Title: {
				bind: 'title',
				type: 'input',
				props: {
					placeholder: 'Search titles'
				}
			},
			Status: {
				bind: 'status',
				type: 'status',
				props: {
					placeholder: 'Select status'
				}
			},
			Labels: {
				bind: 'labels',
				type: 'select',
				props: {
					options: ['Bug', 'Feature', 'Improvement'],
					placeholder: 'Select labels'
				}
			},
			Priority: {
				bind: 'priority',
				type: 'priority',
				props: {
					placeholder: 'Select priorities'
				}
			},
			'Est. Hours': {
				bind: 'estimatedHours',
				type: 'input_number',
				props: {
					placeholder: 'Enter a value'
				}
			},
			'Created At': {
				bind: 'createdAt',
				type: 'date_picker',
				props: {
					placeholder: 'Select date'
				}
			},
			Operation: {
				bind: '_operation',
				type: 'operation'
			}
		},
		filter: {},
		table: {
			Task: {
				bind: 'id',
				type: 'text'
			}
		},
		form: {
			Title: {
				bind: 'title',
				type: 'textarea',
				props: {
					rows: 3
				}
			}
		}
	}
} as Omnitable.Config
