import { HttpResponse } from '@tw/data';
import { Except } from 'type-fest';

export class HttpResponseInner {
  constructor(data: Partial<HttpResponse> = {}) {
    Object.assign(this, data);
  }
}

export function createResponse<T, const Key>(
  params: Partial<Except<HttpResponse, 'message'>> & { message?: Key } = {},
): HttpResponse<T> {
  return Object.assign(new HttpResponseInner(), {
    ...params,
  }) as HttpResponse<T>;
}
