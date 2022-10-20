import React from 'react'
import axios from 'axios'

export const LandingPage = () => {

    const googleLogin = () => {
        window.open("http://localhost:5000/auth/google/login", "_self")
      }

  return (
    <>
      <div>
          <button onClick={()=>googleLogin()}>GOOGLE</button>
      </div>
    </>
  )
}
