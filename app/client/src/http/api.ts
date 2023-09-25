import { VerifyUser, CreateUser, UpdateUser, SocialStats } from 'types'
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
    authUser(): Promise<AxiosResponse<{ user: User; socialStats: SocialStats; followingStatus?: boolean }, any>> {
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
    getPublicUser(id: number) {
      return httpClient.get(`auth/public/user/${id}`)
    },
    followUser(userId: number) {
      return httpClient.post('auth/follow/user', { userId })
    },
    unFollowUser(userId: number) {
      return httpClient.delete(`auth/unfollow/user/${userId}`)
    },
  },
  utile: {
    getMostPopularUsers() {
      return httpClient.get('utile/most/popular/users')
    },
    getSearchTerm(searchData: string) {
      return httpClient.get(`utile/search/${searchData}`)
    },
    getFollowers({ followerOffset, followerLimit }: { followerOffset: number; followerLimit: number }) {
      return httpClient.get(`utile/followers/${followerOffset}/${followerLimit}`)
    },
    getFollowingUsers({ followingOffset, followingLimit }: { followingOffset: number; followingLimit: number }) {
      return httpClient.get(`utile/following/${followingOffset}/${followingLimit}`)
    },
    getPPFollowers({
      PPfollowerOffset,
      PPfollowerLimit,
      userId,
    }: {
      PPfollowerOffset: number
      PPfollowerLimit: number
      userId: number
    }) {
      return httpClient.get(`utile/pp/followers/${userId}/${PPfollowerOffset}/${PPfollowerLimit}`)
    },
    getPPFollowingUsers({
      userId,
      PPfollowingOffset,
      PPfollowingLimit,
    }: {
      userId: number
      PPfollowingOffset: number
      PPfollowingLimit: number
    }) {
      return httpClient.get(`utile/pp/following/${userId}/${PPfollowingOffset}/${PPfollowingLimit}`)
    },
  },
}
