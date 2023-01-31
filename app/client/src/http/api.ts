import { httpClient } from './client'
import { User } from 'types'

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
    signIn() {
      return httpClient.post('login', {})
    },
    authUser() {
      return httpClient.get(`auth`)
    },
  },
}
