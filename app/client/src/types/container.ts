export interface Action<T extends string> {
  type: T
  value?: any
  [key: string]: any
}

export type Post = {
  id: number
  title: string
}
