const env = process.env.NODE_ENV

let baseURL = ''

if (env === 'development') {
    baseURL = ''
} else if (env === 'production') {
    baseURL = ''
} else if (env === 'test') {
    baseURL = ''
}

export default baseURL
