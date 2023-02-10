export interface User {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignInUser {
  email: string
  password: string
}
