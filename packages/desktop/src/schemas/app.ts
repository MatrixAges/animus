import { enum as Enum, infer as Infer, object, record, string } from 'zod'

export const list_item_schema = object({
	module: string(),
	id: string(),
	name: string(),
	icon: string(),
	icon_type: Enum(['icon', 'emoji'])
})

export type ListItem = Infer<typeof list_item_schema>
