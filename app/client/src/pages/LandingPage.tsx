import { fetchPostsThunk } from 'store/features/styleSlice/thunk'
import { SignIn } from 'components/buttonOpenModal/SignIn'
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
import Logo from '../assets/svg/logo.svg'

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
      <Wrapper>
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
        <LogoSection>
          <LogoSvg />
        </LogoSection>
        <ContentSection>
          <ContentWraper>
            <Icon />
            <H1>{'Happening now'}</H1>
            <PrimaryButton onClick={() => setModalIsOpen(!modalIsOpen)}>
              Sign up with email
            </PrimaryButton>
            <SignUpModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
            {/* <SignIn /> */}
          </ContentWraper>
        </ContentSection>
        <Footer />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
`

const LogoSection = styled.div`
  width: calc(100% - 46vw);
  height: 100vh;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const LogoSvg = styled.svg``

const ContentSection = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100vh;
  width: 46vw;
  min-width: 600px;
  background-color: black;
`

const ContentWraper = styled.div`
  padding-left: 25px;
`

const H1 = styled.h1`
  font-size: 65px;
  font-weight: bold;
  letter-spacing: -3px;
  color: ${Colors.textGray};
`
const Icon = styled(SocialTwitter)`
  margin-left: -5px;
  width: 60px;
  height: 60px;
  color: ${Colors.textGray};
`

const Footer = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  /* height: 100vh; */
  /* align-items: center; */
`

// M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z
