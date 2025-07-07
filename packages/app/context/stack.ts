import { createContext, useContext, useContextSelector } from 'stk/react'

import type { Module } from '@/types'

export interface StackContext {
	module: Module
	id: string
	width: number
	container_width: number
}

// @ts-ignore Avoid duplicate declarations
export const StackContext = createContext<StackContext>()

export const useStack = () => {
	return useContext(StackContext)
}

export const useStackSelector = <Selected>(selector: (value: StackContext) => Selected) => {
	return useContextSelector(StackContext, selector)
}
