import { fetchPostsThunk } from 'store/features/styleSlice/thunk'
// import { SignIn } from 'components/buttonOpenModal/SignIn'
import { SignUp } from 'components/buttonOpenModal/SignUp'
import { updateUsername } from 'store/features/styleSlice'
import { PrimaryButton, SecondaryButton, SocialSignInButton } from 'ui/Button'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { SignUpModal } from 'components/modal/SignUpModal'
import styled from 'styled-components'
import { SocialTwitter } from '@styled-icons/foundation/SocialTwitter'
import { Colors } from 'ui/styles/styles'
import { icons } from 'react-icons'
import backgroundImage from 'assets/landing-page-backgrount.png'
import appleSocilSignInlogo from 'assets/apple-socil-signIn-logo.png'
import googleSocialSignInLogo from 'assets/googl-socil-signIn-logo.png'
import logo from '../assets/svg/logo.svg'
import InlineSVG from 'react-inlinesvg/esm'
import { IconSvg } from 'ui/Svg'
import { Footer } from 'components/Footer'
// import myIcon from '../assets/svg/logo.svg'

export const LandingPage = () => {
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google/login', '_self')
  }

  const [isActive, setActive] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const styleSlice = useAppSelector(state => state.style)
  const dispatch = useAppDispatch()
  // let googleSocilSignInLogo: HTMLImageElement
  // console.log(typeof googleSocilSignInLogo)

  return (
    <>
      <PageWraper>
        <LayoutWrapper>
          {/* <button type="button" onClick={() => googleLogin()}>
        GOOGLE
      </button>
      <SignUp />
      <PrimaryButtonV1 onClick={() => setActive(!isActive)}>
        Toggle
      </PrimaryButtonV1>
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
      <hr /> */}
          {/* <SignIn /> */}
          <LogoWraper>
            <LogoSvg />
          </LogoWraper>

          <ContentWraper>
            <ContentSection>
              <Icon />
              <H1>{'Happening now'}</H1>
              <H3>{'Join Twitter today.'}</H3>
              <SocialSignInButton image={googleSocialSignInLogo} wide={true}>
                Sign up with Google
              </SocialSignInButton>
              <SocialSignInButton image={appleSocilSignInlogo} wide={true}>
                Sign up with Apple
              </SocialSignInButton>
              <DividerWraper>
                <DividerLine />
                <H5>{'or'}</H5>
                <DividerLine />
              </DividerWraper>
              <PrimaryButton
                wide={true}
                onClick={() => setModalIsOpen(!modalIsOpen)}
              >
                Sign up with email
              </PrimaryButton>
              <SignUpModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
              />
              <PolicyTextWraper>
                By signing up, you agree to the{' '}
                <span style={{ color: Colors.primary }}>Terms of Service </span>
                and{' '}
                <span style={{ color: Colors.primary }}>Privacy Policy </span>,
                including{' '}
                <span style={{ color: Colors.primary }}>Cookie Use</span>.
              </PolicyTextWraper>
              <H5>{'Already have an account?'}</H5>
              <SecondaryButton wide={true}>Sign in</SecondaryButton>
            </ContentSection>
          </ContentWraper>
        </LayoutWrapper>

        <Footer />
      </PageWraper>
    </>
  )
}

const PageWraper = styled.div`
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

const LogoWraper = styled.div`
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

const ContentWraper = styled.div`
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
  width: 60px;
  height: 60px;
  color: ${Colors.textGray};
`

const H1 = styled.h1`
  font-size: 62px;
  font-weight: 900;
  font-family: 'chip-bold';
  transform: scaleY(1.8);
  transform: scalex(1.3);
  transform-origin: 0 0;
  letter-spacing: -2px;
  color: ${Colors.lighterGray};
`

const H3 = styled.h3`
  font-size: 30px;
  font-weight: 900;
  transform: scaleY(1.8);
  transform: scalex(1.4);
  transform-origin: 0 0;
  letter-spacing: -1px;
  color: ${Colors.lighterGray};
`
const H5 = styled.h5`
  font-weight: 700;
  font-size: medium;
  color: ${Colors.lighterGray};
  padding: 7px;
`

const DividerWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 296px;
`

const DividerLine = styled.div`
  width: 100%;
  height: 0.2px;
  background-color: ${Colors.darkerGrey};
`

const PolicyTextWraper = styled.div`
  width: 268px;
  color: ${Colors.darkGray};
  font-size: x-small;
`
