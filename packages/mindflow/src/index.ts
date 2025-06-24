export type Action = string | undefined
export type AnyNode = BaseNode<any, any, any, any>

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ConditionalTransition {
	constructor(
		private readonly src_node: AnyNode,
		private readonly action: string
	) {}

	to(target_node: AnyNode): AnyNode {
		return this.src_node.next(target_node, this.action)
	}
}

export class BaseNode<Shared, Params, PrepResult, ExecResult> {
	params: Params = {} as Params
	processes: Record<string, AnyNode> = {}

	setParams(params: Params): void {
		this.params = params
	}

	next(node: AnyNode, action: string = 'default'): AnyNode {
		this.processes[action] = node

		return node
	}

	to(node: AnyNode): AnyNode {
		return this.next(node)
	}

	on(action: string): ConditionalTransition {
		return new ConditionalTransition(this, action)
	}

	prep(_shared: Shared): PrepResult {
		return undefined as any
	}

	exec(_prep_res: PrepResult): ExecResult {
		return undefined as any
	}

	post(_shared: Shared, _prep_res: PrepResult, _exec_res: ExecResult): Action {
		return undefined
	}

	run(shared: Shared): Action {
		const prep_res = this.prep(shared)
		const exec_res = this.exec(prep_res)

		return this.post(shared, prep_res, exec_res)
	}

	clone(): this {
		return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
	}
}

export class Node<S, P, PR, ER> extends BaseNode<S, P, PR, ER> {
	cur_retry: number = 0
	readonly max_retries: number
	readonly wait_ms: number

	constructor(max_retries: number = 1, wait_ms: number = 0) {
		super()
		this.max_retries = max_retries
		this.wait_ms = wait_ms // Note: synchronous wait is not implemented to avoid blocking.
	}

	execFallback(_prep_res: PR, exc: unknown): ER {
		throw exc
	}

	exec(prep_res: PR): ER {
		for (this.cur_retry = 0; this.cur_retry < this.max_retries; this.cur_retry++) {
			try {
				return this.exec(prep_res)
			} catch (e) {
				if (this.cur_retry === this.max_retries - 1) {
					return this.execFallback(prep_res, e)
				}
			}
		}
		throw new Error('Execution failed after all retries.')
	}
}

/**
 * A node that processes an array of items sequentially.
 */
export class BatchNode<S, P, Item, ItemResult> extends Node<S, P, Item[], ItemResult[]> {
	exec(items: Item[]): ItemResult[] {
		return (items ?? []).map(item => {
			// We re-implement the retry logic here to apply it per-item.
			for (this.cur_retry = 0; this.cur_retry < this.max_retries; this.cur_retry++) {
				try {
					return this.exec(item)
				} catch (e) {
					if (this.cur_retry === this.max_retries - 1) {
						return this.execFallback(item, e)
					}
				}
			}
			throw new Error(`Batch item execution failed for item: ${item}`)
		})
	}
}

/**
 * Orchestrates a sequence of connected nodes.
 */
export class Flow<S, P, R = any> extends BaseNode<S, P, P, R> {
	start_node?: AnyNode

	constructor(start_node?: AnyNode) {
		super()
		this.start_node = start_node
	}

	start(node: AnyNode): AnyNode {
		this.start_node = node
		return node
	}

	getNextNode(current_node: AnyNode, action: Action): AnyNode | undefined {
		const next_node = current_node.processes[action || 'default']
		if (!next_node && Object.keys(current_node.processes).length > 0) {
			console.warn(
				`Flow ends: action '${action}' not found in processes [${Object.keys(current_node.processes)}].`
			)
		}
		return next_node
	}

	protected orchestrate(shared: S, params?: P): Action {
		let current_node = this.start_node?.clone()
		let last_action: Action
		const flow_params = { ...this.params, ...params }

		while (current_node) {
			current_node.setParams(flow_params)
			last_action = (current_node as any).run(shared)
			current_node = this.getNextNode(current_node, last_action)?.clone()
		}
		return last_action
	}

	post(_s: S, _pr: P, exec_res: R): R {
		return exec_res
	}

	run(shared: S): R {
		const prep_res = this.prep(shared)
		const orch_res = this.orchestrate(shared, prep_res)
		return this.post(shared, prep_res, orch_res as any)
	}
}

export class BatchFlow<S, P extends Record<string, any>> extends Flow<S, P, void> {
	protected run(shared: S): void {
		const batch_params_list = (this.prep(shared) as any[]) || []
		for (const batch_params of batch_params_list) {
			this.orchestrate(shared, { ...this.params, ...batch_params })
		}
		this.post(shared, batch_params_list as any, undefined)
	}
}

export class AsyncNode<S, P, PR, ER> extends Node<S, P, PR, ER> {
	// --- Async Lifecycle Methods (to be overridden) ---
	async prepAsync(_shared: S): Promise<PR> {
		return undefined as any
	}
	async execAsync(_prep_res: PR): Promise<ER> {
		return undefined as any
	}
	async postAsync(_shared: S, _prep_res: PR, _exec_res: ER): Promise<Action> {
		return undefined
	}

	async execFallbackAsync(_prep_res: PR, exc: unknown): Promise<ER> {
		throw exc
	}

	// --- Internal Execution Logic ---
	protected async internalExecAsync(prep_res: PR): Promise<ER> {
		for (this.cur_retry = 0; this.cur_retry < this.max_retries; this.cur_retry++) {
			try {
				return await this.execAsync(prep_res)
			} catch (e) {
				if (this.cur_retry === this.max_retries - 1) {
					return await this.execFallbackAsync(prep_res, e)
				}
				if (this.wait_ms > 0) await sleep(this.wait_ms)
			}
		}
		throw new Error('Async execution failed after all retries.')
	}

	protected async internalRunAsync(shared: S): Promise<Action> {
		const prep_res = await this.prepAsync(shared)
		const exec_res = await this.internalExecAsync(prep_res)
		return await this.postAsync(shared, prep_res, exec_res)
	}

	async runAsync(shared: S): Promise<Action> {
		if (Object.keys(this.processes).length > 0) {
			console.warn("Node won't run processes. Use an AsyncFlow for multi-step workflows.")
		}
		return await this.internalRunAsync(shared)
	}

	// Prevent accidental calls to synchronous methods
	protected run(_shared: S): Action {
		throw new Error('Cannot call sync `run` on an AsyncNode. Use `internalRunAsync`.')
	}
}

abstract class AsyncBatchBase<S, P, Item, ItemResult> extends AsyncNode<S, P, Item[], ItemResult[]> {
	// Override this async method to define logic for one item.
	async execAsync(_item: Item): Promise<ItemResult> {
		throw new Error('AsyncBatch*.execAsync(item) must be implemented.')
	}

	// A helper to run a single item with the full retry logic from AsyncNode.
	protected async runSingleItemWithRetry(item: Item): Promise<ItemResult> {
		for (this.cur_retry = 0; this.cur_retry < this.max_retries; this.cur_retry++) {
			try {
				return await this.execAsync(item)
			} catch (e) {
				if (this.cur_retry === this.max_retries - 1) {
					return await this.execFallbackAsync(item, e)
				}
				if (this.wait_ms > 0) await sleep(this.wait_ms)
			}
		}
		throw new Error(`Async batch item execution failed for item: ${item}`)
	}
}

export class AsyncBatchNode<S, P, Item, ItemResult> extends AsyncBatchBase<S, P, Item, ItemResult> {
	protected async internalExecAsync(items: Item[]): Promise<ItemResult[]> {
		const results: ItemResult[] = []
		for (const item of items ?? []) {
			results.push(await this.runSingleItemWithRetry(item))
		}
		return results
	}
}

export class AsyncParallelBatchNode<S, P, Item, ItemResult> extends AsyncBatchBase<S, P, Item, ItemResult> {
	protected async internalExecAsync(items: Item[]): Promise<ItemResult[]> {
		const tasks = (items ?? []).map(item => this.runSingleItemWithRetry(item))
		return Promise.all(tasks)
	}
}

export class AsyncFlow<S, P, R = any> extends AsyncNode<S, P, P, R> {
	start_node?: AnyNode

	constructor(start_node?: AnyNode) {
		super()
		this.start_node = start_node
	}

	start(node: AnyNode): AnyNode {
		this.start_node = node
		return node
	}

	getNextNode(current_node: AnyNode, action: Action): AnyNode | undefined {
		const next_node = current_node.processes[action || 'default']
		if (!next_node && Object.keys(current_node.processes).length > 0) {
			console.warn(
				`Flow ends: action '${action}' not found in processes [${Object.keys(current_node.processes)}].`
			)
		}
		return next_node
	}

	async orchestrateAsync(shared: S, params?: P): Promise<Action> {
		let current_node = this.start_node?.clone()
		let last_action: Action
		const flow_params = { ...this.params, ...params }

		while (current_node) {
			current_node.setParams(flow_params)

			if (current_node instanceof AsyncNode) {
				last_action = await current_node.internalRunAsync(shared)
			} else {
				last_action = (current_node as any).run(shared)
			}

			current_node = this.getNextNode(current_node, last_action)?.clone()
		}
		return last_action
	}

	async postAsync(shared: S): Promise<R> {
		const prep_res = await this.prepAsync(shared)
		const orch_res = await this.orchestrateAsync(shared, prep_res)

		return await this.postAsync(shared, prep_res, orch_res as any)
	}
}

export class AsyncBatchFlow<S, P extends Record<string, any>> extends AsyncFlow<S, P, void> {
	protected async internalRunAsync(shared: S): Promise<void> {
		const batch_params_list = ((await this.prepAsync(shared)) as any[]) || []

		for (const batch_params of batch_params_list) {
			await this.orchestrateAsync(shared, { ...this.params, ...batch_params })
		}

		await this.postAsync(shared, batch_params_list as any, undefined)
	}
}

export class AsyncParallelBatchFlow<S, P extends Record<string, any>> extends AsyncFlow<S, P, void> {
	protected async internalRunAsync(shared: S): Promise<void> {
		const batch_params_list = ((await this.prepAsync(shared)) as any[]) || []

		const tasks = batch_params_list.map(batch_params =>
			this.orchestrateAsync(shared, { ...this.params, ...batch_params })
		)

		await Promise.all(tasks)
		await this.postAsync(shared, batch_params_list as any, undefined)
	}
}
