import axios from 'axios'
import { Post } from 'types/oldIndex'

export const getPosts = () =>
  axios.get<Post[]>('https://my-json-server.typicode.com/typicode/demo/posts')
