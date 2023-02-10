import React from 'react'

export const Home = () => {
  const logOut = () => {
    process.env.NODE_ENV == 'production'
      ? window.open('/auth/logout', '_self')
      : window.open('http://localhost:5000/auth/logout', '_self')
  }

  return (
    <div>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}
