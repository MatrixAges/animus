import type { Omnitable } from './types'

export const config = {
	name: 'omnitable_test_table',
	primary: 'id',
	actions: {
		baseurl:
			process.env.NODE_ENV === 'production'
				? 'https://omnitable-worker.openages.workers.dev/api/omnitable'
				: 'http://localhost:8787/api/omnitable',
		query: '/query',
		create: '/create',
		update: '/update/{{id}}',
		delete: '/delete/{{id}}'
	},
	filter: {
		columns: [
			{ name: 'Title', datatype: 'string' },
			{ name: 'Status', datatype: 'array' },
			{ name: 'Priority', datatype: 'array' },
			{ name: 'Est. Hours', datatype: 'number' },
			{ name: 'Create At', datatype: 'date' },
			{ name: 'Update At', datatype: 'date' },
			{ name: 'Deadline', datatype: 'date' },
			{ name: 'Labels', datatype: 'array' }
		]
	},
	table: {
		columns: [
			{ name: 'Task', readonly: true, sticky: true },
			{ name: 'Priority', sort: true },
			{ name: 'Title', width: 540, span: 24 },
			{ name: 'Status', sort: true },
			{ name: 'Est. Hours', width: 72, sort: true },
			{ name: 'Deadline', width: 150, sort: true },
			{ name: 'Labels', width: 180 },
			{ name: 'Create At', readonly: true, sort: true },
			{ name: 'Update At', readonly: true, sort: true },
			{ name: 'Operation' }
		]
	},
	form: {
		use_table_columns: true,
		exclude_table_columns: ['Create At', 'Update At']
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
				type: 'select',
				props: {
					options: [
						{
							label: 'Todo',
							value: 0,
							icon: 'acorn'
						},
						{
							label: 'In-progress',
							value: 1,
							icon: 'timer'
						},
						{
							label: 'Done',
							value: 2,
							icon: 'check-circle'
						},
						{
							label: 'Canceled',
							value: 3,
							icon: 'x-circle'
						}
					],
					placeholder: 'Select status'
				}
			},
			Labels: {
				bind: 'labels',
				type: 'select',
				props: {
					options: ['Bug', 'Feature', 'Improvement'],
					mode: 'multiple',
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
				bind: 'estimated_hours',
				type: 'input_number',
				props: {
					placeholder: 'Enter a value'
				}
			},
			Deadline: {
				bind: 'deadline_time',
				type: 'date_picker',
				props: {
					placeholder: 'Select date'
				}
			},
			'Create At': {
				bind: 'create_at',
				type: 'date',
				props: {
					placeholder: 'Select date'
				}
			},
			'Update At': {
				bind: 'update_at',
				type: 'date',
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
				type: 'text',
				props: {
					format: 'Task-{{id}}'
				}
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
