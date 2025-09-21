import { initClient } from '@ts-rest/core';
import { contract } from '@tw/contract';
import axios from 'axios';

// replace hardcoded values with env vars!!!
export const serverLookupTable: { [key: string]: string } = {
  // Nx only exposes variables prefixed with NX
  development: process.env.NX_BASE_URL_SERVER ?? 'http://localhost:5000',
  staging: '',
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
