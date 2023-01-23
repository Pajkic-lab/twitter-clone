import React from 'react'

export const Home = () => {
  const googleLogOut = () => {
    window.open('http://localhost:5000/auth/google/logout', '_self')
  }
  return (
    <div>
      <button onClick={googleLogOut}>Logout</button>
    </div>
  )
}
