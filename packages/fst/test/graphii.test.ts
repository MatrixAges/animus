import fs from 'fs'
import path from 'path'

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@rstest/core'

import Graph from '../src/graphii'

import type { Query, Triple } from '../src/graphii'

const triples_data: Triple[] = [
	{ subject: 'user:1', predicate: 'name', object: 'Alice' },
	{ subject: 'user:1', predicate: 'email', object: 'alice@example.com' },
	{ subject: 'user:1', predicate: 'follows', object: 'user:2' },
	{ subject: 'user:2', predicate: 'name', object: 'Bob' },
	{ subject: 'user:2', predicate: 'follows', object: 'user:1' },
	{ subject: 'post:1', predicate: 'author', object: 'user:1' },
	{ subject: 'post:1', predicate: 'content', object: 'Hello World' }
]

describe('Graph', () => {
	const db_path = path.join(__dirname, 'test-db')
	let db: Graph

	beforeAll(() => {
		if (fs.existsSync(db_path)) {
			fs.rmSync(db_path, { recursive: true, force: true })
		}

		fs.mkdirSync(db_path)
	})

	beforeEach(async () => {
		db = new Graph(db_path)

		for (const triple of triples_data) {
			await db.put(triple)
		}
	})

	afterEach(async () => {
		if (db) {
			db.close()
		}

		fs.rmSync(db_path, { recursive: true, force: true })
		fs.mkdirSync(db_path)
	})

	afterAll(() => {
		fs.rmSync(db_path, { recursive: true, force: true })
	})

	describe('put()', () => {
		it('should not insert a duplicate triple', async () => {
			const initial_triples = await db.get({})
			const initial_count = initial_triples.length

			await db.put({ subject: 'user:1', predicate: 'name', object: 'Alice' })

			const final_triples = await db.get({})
			const final_count = final_triples.length

			expect(final_count).toBe(initial_count)
		})
	})

	describe('del()', () => {
		it('should delete an existing triple', async () => {
			const triple_to_delete: Triple = { subject: 'user:2', predicate: 'follows', object: 'user:1' }

			let found = await db.get(triple_to_delete)
			expect(found).toHaveLength(1)

			await db.del(triple_to_delete)

			found = await db.get(triple_to_delete)
			expect(found).toHaveLength(0)
		})

		it('should handle deletion of a non-existent triple gracefully', async () => {
			const non_existent_triple: Triple = { subject: 'user:99', predicate: 'knows', object: 'user:1' }

			await expect(db.del(non_existent_triple)).resolves.not.toThrow()
		})
	})

	describe('get()', () => {
		it('should get a triple by exact match', async () => {
			const results = await db.get({ subject: 'user:1', predicate: 'name', object: 'Alice' })

			expect(results).toHaveLength(1)
			expect(results[0]).toEqual({ subject: 'user:1', predicate: 'name', object: 'Alice' })
		})

		it('should get all triples for a subject', async () => {
			const results = await db.get({ subject: 'user:1' })

			expect(results).toHaveLength(3)
			expect(results).toContainEqual({ subject: 'user:1', predicate: 'name', object: 'Alice' })
			expect(results).toContainEqual({ subject: 'user:1', predicate: 'email', object: 'alice@example.com' })
			expect(results).toContainEqual({ subject: 'user:1', predicate: 'follows', object: 'user:2' })
		})

		it('should get triples by predicate and object', async () => {
			const results = await db.get({ predicate: 'follows', object: 'user:1' })

			expect(results).toHaveLength(1)
			expect(results[0]).toEqual({ subject: 'user:2', predicate: 'follows', object: 'user:1' })
		})

		it('should return an empty array for a non-existent pattern', async () => {
			const results = await db.get({ subject: 'user:does-not-exist' })

			expect(results).toHaveLength(0)
		})
	})

	describe('search()', () => {
		it('should perform a simple query with one variable', async () => {
			const pattern: Query = { subject: 'user:2', predicate: 'name', object: '?name' }

			const results = await db.search([pattern])

			expect(results).toHaveLength(1)
			expect(results[0]).toEqual({ '?name': 'Bob' })
		})

		it('should perform a two-pattern join', async () => {
			// 查询 "Alice 关注的人的名字是什么?"
			const patterns: Query[] = [
				{ subject: 'user:1', predicate: 'follows', object: '?person' },
				{ subject: '?person', predicate: 'name', object: '?name' }
			]

			const results = await db.search(patterns)

			expect(results).toHaveLength(1)
			expect(results[0]).toEqual({ '?person': 'user:2', '?name': 'Bob' })
		})

		it('should handle joins that result in multiple solutions', async () => {
			// 查询 "谁写了帖子，他们的名字是什么？"
			const patterns: Query[] = [
				{ subject: '?post', predicate: 'author', object: '?authorId' },
				{ subject: '?authorId', predicate: 'name', object: '?authorName' }
			]

			const results = await db.search(patterns)

			expect(results).toHaveLength(1)
			expect(results[0]).toEqual({
				'?post': 'post:1',
				'?authorId': 'user:1',
				'?authorName': 'Alice'
			})
		})

		it('should return an empty array for a join with no solution', async () => {
			// 查询 "Bob 写的帖子的内容是什么?" (Bob 没写过帖子)
			const patterns: Query[] = [
				{ subject: '?post', predicate: 'author', object: 'user:2' },
				{ subject: '?post', predicate: 'content', object: '?content' }
			]

			const results = await db.search(patterns)

			expect(results).toHaveLength(0)
		})

		it('should correctly join three patterns', async () => {
			// 查询 "谁关注了 Alice，并且 Alice 也关注了他/她？他们的名字是什么？"
			const patterns: Query[] = [
				{ subject: '?person', predicate: 'follows', object: 'user:1' },
				{ subject: 'user:1', predicate: 'follows', object: '?person' },
				{ subject: '?person', predicate: 'name', object: '?name' }
			]

			const results = await db.search(patterns)

			expect(results).toHaveLength(1)
			expect(results[0]).toEqual({ '?person': 'user:2', '?name': 'Bob' })
		})
	})
})
