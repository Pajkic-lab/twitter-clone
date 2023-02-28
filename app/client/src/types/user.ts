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
  createdAt: string
}

export interface CreateUser {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type VerifyUser = Omit<CreateUser, 'name' | 'confirmPassword'>

export type UpdateUser = Partial<Pick<User, 'name' | 'bio' | 'location' | 'website' | 'cover' | 'avatar'>>
