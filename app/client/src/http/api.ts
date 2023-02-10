import { SignInUser, User } from 'types'
import { httpClient } from './client'

export default {
  auth: {
    signUp({ name, email, password, confirmPassword }: User) {
      return httpClient.post('auth/register', {
        username: name,
        email,
        password,
        confirmPassword,
      })
    },
    signIn({ email, password }: SignInUser) {
      return httpClient.post('auth/login', {
        username: 'placeholder',
        email,
        password,
      })
    },
    authUser() {
      return httpClient.get(`auth`)
    },
  },
}
