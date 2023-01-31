import axios from 'axios'

const serverLookupTable: { [key: string]: string } = {
  development: 'http://localhost:5000',
  test: '',
  production: '',
}

export const httpClient = axios.create({
  baseURL: serverLookupTable[process.env.NODE_ENV!],
  withCredentials: true,
})

export function setApiKeyHeader(token: string) {
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
