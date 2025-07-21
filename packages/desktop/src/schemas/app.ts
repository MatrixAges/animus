import { any, boolean, enum as Enum, infer as Infer, number, object, string } from 'zod'

export const schema_file_index = object({
	module: string(),
	id: string(),
	name: string(),
	desc: string(),
	icon: string().optional(),
	icon_type: Enum(['icon', 'emoji']).optional(),
	loading: boolean().optional(),
	create_at: number().optional(),
	update_at: number().optional()
}).catchall(any())

export type FileIndex = Infer<typeof schema_file_index>
export type FileIndexs = Array<FileIndex>
