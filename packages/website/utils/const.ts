export const is_dev = process.env.NODE_ENV === 'development'
export const is_prod = process.env.NODE_ENV === 'production'
export const base_url = process.env.NEXT_PUBLIC_BASE_URL
export const is_server = typeof window === 'undefined'
