import { PrimaryButton, SecondaryButton, SocialSignInButton } from 'ui/Button'
import googleSocialSignInLogo from 'assets/googl-socil-signIn-logo.png'
import { SocialTwitter } from '@styled-icons/foundation/SocialTwitter'
import appleSocilSignInlogo from 'assets/apple-socil-signIn-logo.png'
import backgroundImage from 'assets/landing-page-backgrount.png'
import { SignInModal } from 'components/modals/SignInMoudal'
import { SignUpModal } from 'components/modals/SignUpModal'
import { Footer } from 'components/Footer'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from 'ui/styles'

export const LandingPage = () => {
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false)
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false)

  const googleLogin = () => {
    process.env.NODE_ENV == 'production'
      ? window.open('/auth/google/login', '_self')
      : window.open('http://localhost:5000/auth/google/login', '_self')
  }
  console.log(process.env.NODE_ENV)
  return (
    <>
      <PageWrapper>
        <LayoutWrapper>
          <LogoWrapper>
            <LogoSvg />
          </LogoWrapper>

          <ContentWrapper>
            <ContentSection>
              <Icon />
              <H1>Happening now</H1>
              <H3>Join Twitter today.</H3>
              <SocialButton
                onClick={googleLogin}
                image={googleSocialSignInLogo}
                $wide={true}
              >
                Sign up with Google
              </SocialButton>
              <SocialButton image={appleSocilSignInlogo} $wide={true}>
                Sign up with Apple
              </SocialButton>
              <DividerWrapper>
                <DividerLine />
                <H5>or</H5>
                <DividerLine />
              </DividerWrapper>
              <SignUpButton
                $wide={true}
                onClick={() => setSignUpModalIsOpen(!signUpModalIsOpen)}
              >
                Sign up with email
              </SignUpButton>
              <SignUpModal
                signUpModalIsOpen={signUpModalIsOpen}
                setSignUpModalIsOpen={setSignUpModalIsOpen}
              />
              <PolicyTextWrapper>
                By signing up, you agree to the
                <SpanText>Terms of Service </SpanText>
                and <SpanText>Privacy Policy</SpanText>, including
                <SpanText> Cookie Use</SpanText>.
              </PolicyTextWrapper>
              <H4>Already have an account?</H4>
              <SignInButton
                $wide={true}
                onClick={() => setSignInModalIsOpen(!signInModalIsOpen)}
              >
                Sign in
              </SignInButton>
              <SignInModal
                signInModalIsOpen={signInModalIsOpen}
                setSignInModalIsOpen={setSignInModalIsOpen}
              />
            </ContentSection>
          </ContentWrapper>
        </LayoutWrapper>

        <Footer />
      </PageWrapper>
    </>
  )
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  height: 100%;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 46vw);
  height: 100%;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const LogoSvg = styled(SocialTwitter)`
  width: 470px;
  height: 470px;
  color: ${Colors.white};
  @media (max-width: 1200px) {
    width: 75%;
    height: 75%;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 46vw;
  min-width: 600px;
  padding-left: 35px;
  background-color: ${Colors.black};
`

const ContentSection = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`

const Icon = styled(SocialTwitter)`
  margin-left: -5px;
  width: 56px;
  height: 56px;
  color: ${Colors.textGray};
`

const H1 = styled.h1`
  padding-top: 10px;
  margin-bottom: 8px;
  font-size: 62px;
  font-weight: 900;
  font-family: 'chip-bold';
  transform-origin: 0 0;
  transform: scaleY(1.8);
  transform: scalex(1.3);
  letter-spacing: -3px;
  color: ${Colors.lighterGray};
`

const H3 = styled.h3`
  margin-bottom: 28px;
  font-size: 30px;
  font-weight: 900;
  transform-origin: 0 0;
  transform: scaleY(1.8);
  transform: scalex(1.4);
  transform-origin: 0 0;
  letter-spacing: -1px;
  color: ${Colors.lighterGray};
`

const H4 = styled.h4`
  margin-bottom: 18px;
  font-weight: 600;
  font-size: 18px;
  color: ${Colors.lighterGray};
`

const H5 = styled.h5`
  font-weight: 500;
  font-size: medium;
  color: ${Colors.lighterGray};
  padding: 7px;
`

const SpanText = styled.span`
  color: ${Colors.primary};
`

const DividerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 296px;
  margin-bottom: 5px;
`

const DividerLine = styled.div`
  width: 100%;
  height: 0.2px;
  background-color: ${Colors.darkerGrey};
`

const PolicyTextWrapper = styled.div`
  width: 300px;
  margin-bottom: 35px;
  color: ${Colors.darkGray};
  font-size: 11px;
`

const SocialButton = styled(SocialSignInButton)`
  margin-bottom: 8px;
`

const SignUpButton = styled(PrimaryButton)`
  margin-bottom: 5px;
`

const SignInButton = styled(SecondaryButton)``
