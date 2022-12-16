import { fetchPostsThunk } from 'store/features/styleSlice/thunk'
// import { SignIn } from 'components/buttonOpenModal/SignIn'
import { SignUp } from 'components/buttonOpenModal/SignUp'
import { updateUsername } from 'store/features/styleSlice'
import { PrimaryButton } from 'ui/Button'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { SignUpModal } from 'components/modal/SignUpModal'
import styled from 'styled-components'
import { SocialTwitter } from '@styled-icons/foundation/SocialTwitter'
import { Colors } from 'ui/styles/styles'
import { icons } from 'react-icons'
import backgroundImage from '../assets/landing-page-backgrount.png'
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
          <LogoWraper>
            <LogoSvg />
          </LogoWraper>

          <ContentWraper>
            <ContentSection>
              <Icon />
              <H1>{'Happening now'}</H1>
              <H3>{'Join Twitter today.'}</H3>
              <PrimaryButton onClick={() => setModalIsOpen(!modalIsOpen)}>
                Sign up with email
              </PrimaryButton>
              <SignUpModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
              />
              {/* <SignIn /> */}
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
  background-color: ${Colors.black};
`

const ContentSection = styled.div`
  padding-left: 35px;
`

const H1 = styled.h1`
  font-size: 62px;
  font-weight: 900;
  font-family: 'chip-bold';
  transform: scaleY(1.5);
  transform: scalex(1.2);
  transform-origin: 0 0;
  letter-spacing: -2px;
  color: ${Colors.textColorLighterGray};
`

const H3 = styled.h3`
  font-size: 32px;
  font-weight: bold;
  transform: scaleY(1.5);
  transform: scalex(1.2);
  transform-origin: 0 0;
  letter-spacing: -1px;
  color: ${Colors.textColorLighterGray};
`

const Icon = styled(SocialTwitter)`
  margin-left: -5px;
  width: 60px;
  height: 60px;
  color: ${Colors.textGray};
`
