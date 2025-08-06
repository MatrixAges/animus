import { open } from 'lmdb'

import { isVariable, key_map, SEP } from './utils'

import type { Database, RootDatabase } from 'lmdb'
import type { Query, Solution, Triple } from './types'

export * from './types'

export default class Index {
	private readonly env: RootDatabase
	private readonly triples_db: Database<Triple>
	private readonly spo_db: Database<string>
	private readonly pos_db: Database<string>
	private readonly osp_db: Database<string>
	private readonly sop_db: Database<string>
	private readonly pso_db: Database<string>
	private readonly ops_db: Database<string>

	private readonly index_dbs: Record<string, Database<string>>
	private readonly index_keys: Array<keyof Triple> = ['subject', 'predicate', 'object']

	constructor(path: string, map_size = 1024 * 1024 * 1024) {
		this.env = open({
			path,
			maxDbs: 8,
			mapSize: map_size
		})

		this.triples_db = this.env.openDB<Triple>({ name: 'triples' })
		this.spo_db = this.env.openDB<string>({ name: 'spo' })
		this.pos_db = this.env.openDB<string>({ name: 'pos' })
		this.osp_db = this.env.openDB<string>({ name: 'osp' })
		this.sop_db = this.env.openDB<string>({ name: 'sop' })
		this.pso_db = this.env.openDB<string>({ name: 'pso' })
		this.ops_db = this.env.openDB<string>({ name: 'ops' })

		this.index_dbs = {
			spo: this.spo_db,
			pos: this.pos_db,
			osp: this.osp_db,
			sop: this.sop_db,
			pso: this.pso_db,
			ops: this.ops_db
		}
	}

	public async search(patterns: Query[]) {
		if (patterns.length === 0) {
			return []
		}

		const planned_patterns = this.plan(patterns)

		let solutions: Solution[] = [{}]

		for (const pattern of planned_patterns) {
			const next_solutions: Solution[] = []

			for (const solution of solutions) {
				const bound_pattern = this.bind(pattern, solution)
				const results = await this.get(bound_pattern)

				for (const triple of results) {
					const new_solution = this.join(pattern, triple, solution)

					if (new_solution) {
						next_solutions.push(new_solution)
					}
				}
			}

			solutions = next_solutions

			if (solutions.length === 0) {
				break
			}
		}

		return solutions
	}

	public async get(pattern: Query) {
		return this.env.transaction(() => {
			const { order, prefix } = this.getIndex(pattern)

			const index_db = this.index_dbs[order]
			const results: Array<Triple> = []

			const query = index_db.getRange({ start: prefix })

			for (const { key, value } of query) {
				if (typeof key === 'string' && !key.startsWith(prefix)) break

				const triple = this.triples_db.get(value)

				if (triple) results.push(triple)
			}

			return results
		})
	}

	public async put(triple: Triple) {
		await this.env.transaction(() => {
			const key = this.generateKey(triple, 'spo')

			if (this.spo_db.get(key)) return

			const triple_key = this.generateKey(triple, 'spo')

			this.triples_db.put(triple_key, triple)

			for (const order in this.index_dbs) {
				const index_key = this.generateKey(triple, order)
				this.index_dbs[order].put(index_key, triple_key)
			}
		})
	}

	public async del(triple: Triple) {
		await this.env.transaction(() => {
			const key = this.generateKey(triple, 'spo')
			const triple_key = this.spo_db.get(key)

			if (!triple_key) return

			this.triples_db.remove(triple_key)

			for (const order in this.index_dbs) {
				const index_key = this.generateKey(triple, order)

				this.index_dbs[order].remove(index_key)
			}
		})
	}

	private generateKey(triple: Triple, order: string) {
		const [a, b, c] = order.split('') as (keyof typeof key_map)[]

		const key1 = key_map[a]
		const key2 = key_map[b]
		const key3 = key_map[c]

		return `${triple[key1]}${SEP}${triple[key2]}${SEP}${triple[key3]}`
	}

	private getIndex(pattern: Query): { order: string; prefix: string } {
		const provided = this.index_keys.filter(key => pattern[key] !== undefined)

		for (const order of Object.keys(this.index_dbs)) {
			if (provided.every(p => order.includes(p[0]))) {
				if (order.startsWith(provided.map(p => p[0]).join(''))) {
					const prefix = provided.map(p => pattern[p as keyof Triple]).join(SEP)

					return { order, prefix }
				}
			}
		}

		return { order: 'spo', prefix: '' }
	}

	private plan(patterns: Query[]) {
		return patterns.sort((a, b) => {
			const a_vars = Object.values(a).filter(isVariable).length
			const b_vars = Object.values(b).filter(isVariable).length

			return a_vars - b_vars
		})
	}

	private bind(pattern: Query, solution: Solution): Query {
		const bound = {} as Query

		for (const key of ['subject', 'predicate', 'object'] as const) {
			const term = pattern[key]!

			if (isVariable(term)) {
				if (solution[term]) {
					bound[key] = solution[term]
				}
			} else {
				bound[key] = term
			}
		}

		return bound
	}

	private join(pattern: Query, triple: Triple, solution: Solution): Solution | null {
		const new_solution = { ...solution }

		for (const key of ['subject', 'predicate', 'object'] as const) {
			const term = pattern[key]!

			if (isVariable(term)) {
				if (new_solution[term] && new_solution[term] !== triple[key]) {
					return null
				}

				new_solution[term] = triple[key]
			}
		}

		return new_solution
	}

	public close(): void {
		this.env.close()
	}
}
