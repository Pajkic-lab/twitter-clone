export type HttpResponse<T = unknown> = {
  isSuccessful: boolean;
  payload: T;
  code: number;
  message: string;
};
