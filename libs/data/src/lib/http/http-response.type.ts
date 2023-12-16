import { HttpResponseType } from './http-response-type.enum';

export type HttpResponse<T = unknown> = {
  isSuccessful: boolean;
  payload: T;
  code: number;
  message: string;
  type: `${HttpResponseType}`;
};
