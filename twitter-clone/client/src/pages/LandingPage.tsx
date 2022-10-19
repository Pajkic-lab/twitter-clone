import React from 'react'

export const LandingPage = () => {

    const googleLogin = () => {
        window.open("http://localhost:5000/auth/google/login", "_self")
      }

      const testic = () => {
        // window.open("http://localhost:5000/auth/google/login", "_self")
        fetch("http://localhost:5000/test").then(nesto => console.log(nesto))
      }
      
  return (
    <>
      <div>
          <button onClick={()=>googleLogin()}>GOOGLE</button>
      </div>

      <div>
          <button onClick={()=>testic()}>testic</button>
      </div>
    </>
  )
}
