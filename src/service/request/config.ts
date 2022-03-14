// http://152.136.185.210:5000

// let BASE_URL = 'http://152.136.185.210:5000'
// BASE_URL = 'http://123.207.32.32:8000'
let BASE_URL = ''
const TIMEOUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8000'
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'test'
}

export { BASE_URL, TIMEOUT }
