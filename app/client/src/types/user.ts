export interface User {
  id: number | null
  name: string
  email: string
}

export interface CreateUser {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type VerifyUser = Omit<CreateUser, 'name' | 'confirmPassword'>
