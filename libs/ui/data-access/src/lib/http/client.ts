import axios from 'axios';
import { initClient } from '@ts-rest/core';
import { contract } from '@tw/contract';

// replace hardcoded values with env vars!!!
const serverLookupTable: { [key: string]: string } = {
  development: 'http://localhost:5000',
  test: '',
  production: 'https://twitter-clone-j82h.onrender.com',
};

export const httpClient = axios.create({
  baseURL: serverLookupTable[process.env['NODE_ENV']!],
  withCredentials: true,
});

export function setApiKeyHeader(token: string) {
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const contractClient = initClient(contract, {
  baseUrl: serverLookupTable[process.env['NODE_ENV']!] as string,
  baseHeaders: {},
  withCredentials: true,
});
