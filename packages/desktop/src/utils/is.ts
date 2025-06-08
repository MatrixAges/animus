import { app } from 'electron'

const isEnvSet = 'ELECTRON_IS_DEV' in process.env
const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV!, 10) === 1

export const show_devtool = !(Number(process.env.PROD) === 1)
export const id_platform = process.env.PLATFORM
export const is_dev = isEnvSet ? getFromEnv : !app.isPackaged
export const is_mac = process.platform === 'darwin'
export const is_mas = is_mac && process.mas === true
export const is_win = process.platform === 'win32'
