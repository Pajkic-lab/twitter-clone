import React from 'react';
import { SignIn } from 'components/buttonOpenModal/SignIn';
import { SignUp } from 'components/buttonOpenModal/SignUp';

export function LandingPage() {
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google/login', '_self');
  };

  return (
    <div>
      <button type="button" onClick={() => googleLogin()}>
        GOOGLE
      </button>
      <SignUp />
      <SignIn />
    </div>
  );
}
