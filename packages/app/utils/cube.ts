import cube from '@cubejs-client/core'

export default cube(process.env.PUBLIC_CUBE_API_TOKEN, { apiUrl: process.env.PUBLIC_CUBE_API_URL })
