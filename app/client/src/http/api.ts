import { VerifyUser, CreateUser, UpdateUser } from 'types'
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
    googleAuthenticate() {
      return httpClient.get('auth/google/login')
    },
    authUser(): Promise<AxiosResponse<{ user: User }, any>> {
      return httpClient.get('auth/user')
    },
    signOut() {
      return httpClient.get('auth/logout')
    },
    checkNameUniqueness(uniqueName: string) {
      return httpClient.post('auth/nameuniqueness', { uniqueName })
    },
    updateUserUniqueName(uniqueName: string) {
      return httpClient.post('auth/createuniquename', { uniqueName })
    },
    updateUser(updateUser: UpdateUser) {
      return httpClient.patch('auth/update/user', { updateUser })
    },
  },
}
