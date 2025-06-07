export type NestedObject = {
	[key: string]: NestedObject | string
}

export type FlatObject<T> = {
	[K in keyof T]: T[K] extends string ? (K extends string ? `${string}.${K}` | K : never) : FlatObject<T[K]>
}
