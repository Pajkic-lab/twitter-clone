import { VerifyUser, CreateUser } from 'types'
import { AxiosResponse } from 'axios'
import { httpClient } from './client'
import { User } from 'types'

export default {
  auth: {
    signUp({ name, email, password, confirmPassword }: CreateUser) {
      return httpClient.post('auth/register', {
        username: name,
        email,
        password,
        confirmPassword,
      })
    },
    signIn({ email, password }: VerifyUser) {
      return httpClient.post('auth/login', {
        username: 'placeholder',
        email,
        password,
      })
    },
    authUser(): Promise<AxiosResponse<{ user: User }, any>> {
      return httpClient.get(`auth/user`)
    },
  },
}
