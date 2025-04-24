export const sort_options = [
	{
		label: 'Asc',
		value: 'asc'
	},
	{
		label: 'Desc',
		value: 'desc'
	}
]

export const filter_relation_options = [
	{
		label: 'and',
		value: 'and'
	},
	{
		label: 'or',
		value: 'or'
	}
]

export const common_expressions = ['is empty', 'is not empty']

export const filter_expressions = {
	string: ['contains', 'does not contain', 'is', 'is not', ...common_expressions],
	number: [
		'is',
		'is not',
		'is less then',
		'is less then or euqal to',
		'is greater then',
		'is greater then or euqal to',
		'is between',
		...common_expressions
	],
	date: [
		'is',
		'is not',
		'is before',
		'is after',
		'is on or before',
		'is on or after',
		'is between',
		...common_expressions
	],
	array: ['has any of', 'has none of', ...common_expressions]
}
