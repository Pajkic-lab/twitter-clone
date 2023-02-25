import { ReactComponent as notifications } from 'assets/svg/notifications.svg'
import { ReactComponent as twitterLogo } from 'assets/svg/twitterLogo.svg'
import { ReactComponent as bookmark } from 'assets/svg/bookmark.svg'
import { ReactComponent as hashTag } from 'assets/svg/hashTag.svg'
import { ReactComponent as message } from 'assets/svg/message.svg'
import { ReactComponent as profile } from 'assets/svg/profile.svg'
import { ReactComponent as options } from 'assets/svg/options.svg'
import { signOutThunk } from 'store/features/authSlice/thunk'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { ReactComponent as more } from 'assets/svg/more.svg'
import { ReactComponent as home } from 'assets/svg/home.svg'
import { ReactComponent as list } from 'assets/svg/list.svg'
import { PrimaryButton } from 'ui/Button'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Colors } from 'ui/styles'
import Tippy from '@tippyjs/react'

type SideBarLogoProps = {
  component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  fill?: string
  width?: string
  height?: string
}

export const SideBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { name, uniqueName } = useAppSelector(state => state.auth)

  const [visible, setVisible] = useState(false)

  const logOut = () => {
    void dispatch(signOutThunk())
  }

  const Balloon: React.FC = () => {
    return (
      <BallonWrapper onClick={logOut}>
        <SpanText>Log out {uniqueName}</SpanText>
      </BallonWrapper>
    )
  }

  return (
    <Wrapper>
      <IconWrapper>
        <TwitterLogo />
      </IconWrapper>
      <ContentWrapper>
        {sideBarData.map((el, index) => {
          return (
            <Link to={el.path} key={index}>
              <LinkWrapper>
                <SVGWrapper>
                  <SideBarLogo component={el.component} />
                </SVGWrapper>
                <H2>{el.name}</H2>
              </LinkWrapper>
            </Link>
          )
        })}
      </ContentWrapper>
      <Button>Tweet</Button>

      <Tippy
        visible={visible}
        arrow={true}
        interactive={true}
        onClickOutside={() => setVisible(!visible)}
        content={<Balloon />}
      >
        <ProfileButtonWrapper onClick={() => setVisible(!visible)}>
          <BioWrapper>
            <ProfileImage />
            <TextWrapper>
              <H3>{name}</H3>
              <Span>{uniqueName}</Span>
            </TextWrapper>
          </BioWrapper>
          <Options />
        </ProfileButtonWrapper>
      </Tippy>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  padding-top: 1rem;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  padding: 0 0 1rem 1rem;
`

const TwitterLogo = styled(twitterLogo)`
  fill: ${Colors.textGray};
  width: 2rem;
  height: 2rem;
`

const ContentWrapper = styled.div``

const LinkWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 1rem 0 1rem;
  border-radius: 5rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blackActive};
  }
`

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SideBarLogo: React.FC<SideBarLogoProps> = ({
  component: Component,
  fill = Colors.textGray,
  width = '2rem',
  height = '2rem',
}) => {
  return <Component fill={fill} width={width} height={height} />
}

const H2 = styled.h2`
  color: ${Colors.textGray};
  padding-left: 0.6rem;
  margin: 0.9rem;
  font-weight: 500;
`

const Button = styled(PrimaryButton)`
  width: 100%;
  height: 3.6rem;
  margin-top: 0.6rem;
`

const ProfileButtonWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem 0 1rem;
  border-radius: 5rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blackActive};
  }
`

const BioWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.3rem;
`

const ProfileImage = styled.div`
  border-radius: 100%;
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${Colors.primary};
`

const TextWrapper = styled.div``

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${Colors.textGray};
  font-weight: 700;
`

const Span = styled.span`
  margin: 0;
  padding-left: 0.8rem;
  color: ${Colors.darkGray};
  font-weight: 500;
`

const Options = styled(options)`
  fill: ${Colors.textGray};
  width: 2rem;
  height: 2rem;
`

const BallonWrapper = styled.div`
  width: 16rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.4rem;
  box-shadow: 0 0 8px hsla(0, 100%, 99.2156862745098%, 0.738);
  cursor: pointer;
`

const SpanText = styled.span`
  color: ${Colors.textGray};
  font-weight: 700;
`

const sideBarData = [
  {
    component: home,
    name: 'Home',
    path: '/home',
  },
  {
    component: hashTag,
    name: 'Explore',
    path: '/explore',
  },
  {
    component: notifications,
    name: 'Notifications',
    path: '/notifications',
  },
  {
    component: message,
    name: 'Messages',
    path: '/messages',
  },
  {
    component: bookmark,
    name: 'Bookmarks',
    path: '/bookmarks',
  },
  {
    component: list,
    name: 'Lists',
    path: '/lists',
  },
  {
    component: profile,
    name: 'Profile',
    path: '/profile',
  },
  {
    component: more,
    name: 'More',
    path: '/more',
  },
]
