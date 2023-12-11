import { Except } from 'type-fest';
import { HttpResponse } from '@tw/data';

// export enum HttpResponseType {
//   STANDARD = 'STANDARD',
//   BACKGROUND = 'BACKGROUND',
// }

// export type HttpResponse<T = unknown> = {
//   isSuccessful: boolean;
//   payload: T;
//   code: number;
//   message: string;
//   type: `${HttpResponseType}`;
// };

export class HttpResponseInner {
  constructor(data: Partial<HttpResponse> = {}) {
    Object.assign(this, data);
  }
}

export function createResponse<T, const Key>(
  params: Partial<Except<HttpResponse, 'message'>> & { message?: Key } = {}
): HttpResponse<T> {
  return Object.assign(new HttpResponseInner(), {
    ...params,
  }) as HttpResponse<T>;
}
