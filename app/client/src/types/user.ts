export interface User {
  id: number | null
  name: string
  email: string
  avatar: string
  cover: string
  uniqueName: string
  bio: string
  location: string
  website: string
  birthDate: string
  createdDate: string
}

export interface CreateUser {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type VerifyUser = Omit<CreateUser, 'name' | 'confirmPassword'>
