import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverLookupTable } from '../../http/client';
// import type { Pokemon } from './types';

// Define a service using a base URL and expected endpoints
export const experimentalSlice = createApi({
  reducerPath: 'expermintalSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: serverLookupTable[process.env['NODE_ENV']!],
  }),
  endpoints: (builder) => ({
    // any should be replace with Pokemon
    postUser: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostUserQuery } = experimentalSlice;
