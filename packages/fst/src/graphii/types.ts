export interface Triple {
	subject: string
	predicate: string
	object: string
}

export type Query = Partial<Triple>
export type Solution = { [key: string]: string }
