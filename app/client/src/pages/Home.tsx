import React from 'react'

export const Home = () => {
  const googleLogOut = () => {
    process.env.NODE_ENV == 'production'
      ? window.open('/auth/google/logout', '_self')
      : window.open('http://localhost:5000/auth/google/logout', '_self')
  }
  return (
    <div>
      <button onClick={googleLogOut}>Logout</button>
    </div>
  )
}
