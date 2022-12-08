import { fetchPostsThunk } from 'store/features/styleSlice/thunk'
import { SignIn } from 'components/buttonOpenModal/SignIn'
import { SignUp } from 'components/buttonOpenModal/SignUp'
import { updateUsername } from 'store/features/styleSlice'
import { PrimaryButton } from 'ui/Button'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export function LandingPage() {
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google/login', '_self')
  }

  const [isActive, setActive] = useState(false)
  const styleSlice = useAppSelector(state => state.style)
  const dispatch = useAppDispatch()

  return (
    <div>
      <button type="button" onClick={() => googleLogin()}>
        GOOGLE
      </button>
      <SignUp />
      <SignIn />
      <PrimaryButton onClick={() => setActive(!isActive)}>Toggle</PrimaryButton>
      <p>{styleSlice.id}</p>
      <p>{styleSlice.userName}</p>
      <p>{styleSlice.email}</p>
      <form>
        <input
          placeholder="user name"
          onChange={e => dispatch(updateUsername(e.target.value))}
        />{' '}
        <br />
      </form>
      <button onClick={() => void dispatch(fetchPostsThunk())}>
        fetch posts
      </button>
    </div>
  )
}
