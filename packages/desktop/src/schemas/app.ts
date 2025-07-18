import { any, enum as Enum, infer as Infer, object, string } from 'zod'

export const list_item_schema = object({
	module: string(),
	id: string(),
	name: string(),
	desc: string(),
	icon: string(),
	icon_type: Enum(['icon', 'emoji'])
}).catchall(any())

export type ListItem = Infer<typeof list_item_schema>
