import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPosts } from 'services/api'

export const fetchPostsThunk = createAsyncThunk('posts/fetch', () => {
  return getPosts()
})
