import { exec, execSync, spawn } from 'child_process'
import { resolve } from 'path'
import Watchpack from 'watchpack'

import type { ChildProcess } from 'child_process'

const watcher = new Watchpack({})
const is_win = process.platform === 'win32'
const file = resolve(`dist/index.js`)

const electron_path = is_win ? 'electron.CMD' : 'electron'

watcher.watch({
	files: [file]
})

let electron_child_process: ChildProcess

watcher.on('change', () => {
	if (electron_child_process) {
		if (is_win) {
			spawn('taskkill', ['/pid', electron_child_process.pid!.toString(), '/f', '/t'])
		} else {
			electron_child_process.kill()
		}
	}

	electron_child_process = exec(`${electron_path} .`, (res) => {
		console.log('启动成功')
	})

	electron_child_process.stdout!.on('data', (data) => {
		console.log('主线程输出: ' + data)
	})

	electron_child_process.stderr!.on('data', (data) => {
		// console.error('主线程报错: ' + data)
	})

	electron_child_process.on('exit', (data) => {
		console.log('主线程退出: ' + data)
	})
})
