import { resolve } from 'path'

export const getAppPath = (v: string) => resolve(__dirname, '../app_dist/', v)
export const getPath = (v: string) => resolve(__dirname, '../', v)
