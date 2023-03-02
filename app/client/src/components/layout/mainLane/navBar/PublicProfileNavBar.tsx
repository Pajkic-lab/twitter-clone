import { ReactComponent as ArrowLeft } from 'assets/svg/arrowLeft.svg'
import { ReactComponent as Location } from 'assets/svg/location.svg'
import { ReactComponent as Calender } from 'assets/svg/calender.svg'
import { ReactComponent as WebLink } from 'assets/svg/webLink.svg'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { SecondaryButton } from 'ui/Button'
import styled from 'styled-components'
import { Colors } from 'ui/styles'

export const PublicProfileNavBar: React.FC = () => {
  const { name, uniqueName, avatar, cover, bio, createdAt, location, website } = useAppSelector(
    state => state.publicProfile,
  )
  const navigate = useNavigate()

  const [selected, setSelected] = useState({
    tweets: true,
    tweetsReplies: false,
    media: false,
    likes: false,
  })
  const { tweets, tweetsReplies, media, likes } = selected

  // const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false)

  return (
    <Wrapper>
      <HeaderWrapper>
        <SVGWrapper onClick={() => navigate(-1)}>
          <ArrowLogo />
        </SVGWrapper>
        <TittleWrapper>
          <H3>{name}</H3>
          <SpanHeader>number of tweets</SpanHeader>
        </TittleWrapper>
      </HeaderWrapper>

      <CoverWrapper $backgroundImage={cover} />

      <ProfileImageWrapper>
        <ImageWrapper $backgroundImage={avatar} />
        {/* <EditProfileButton onClick={() => setEditProfileModalIsOpen(true)}>Edit profile</EditProfileButton>
          <EditProfileModal
            editProfileModalIsOpen={editProfileModalIsOpen}
            setEditProfileModalIsOpen={setEditProfileModalIsOpen}
          /> */}
      </ProfileImageWrapper>

      <BioWrapper>
        <TextWrapper>
          <H2Bio>{name}</H2Bio>
          <SpanBio>{uniqueName}</SpanBio>
        </TextWrapper>

        <SpanTextWrapper>
          <SpanText>{bio}</SpanText>
        </SpanTextWrapper>

        <DescriptionWrapper>
          <LocationAndWebsiteWrapper>
            {location && <LocationLogo />}
            <SpanBio>{location}</SpanBio>
            {website && <WebLinkLogo />}
            <WebLinkSpan href={website} target="_blank">
              {website}
            </WebLinkSpan>
          </LocationAndWebsiteWrapper>
          <DateWrapper>
            <CanlenderLogo />
            <SpanBio>{createdAt}</SpanBio>
          </DateWrapper>
        </DescriptionWrapper>

        <SocialStatsWrapper>
          <FollowingStatsWrapper>
            <StatsNumberSpan>0</StatsNumberSpan>
            <StatsTextSpan>Following</StatsTextSpan>
          </FollowingStatsWrapper>
          <FollowersStatsWrapper>
            <StatsNumberSpan>0</StatsNumberSpan>
            <StatsTextSpan>Followers</StatsTextSpan>
          </FollowersStatsWrapper>
        </SocialStatsWrapper>
      </BioWrapper>

      <NavigationWrapper>
        <Navigation onClick={() => setSelected({ tweets: true, tweetsReplies: false, media: false, likes: false })}>
          <Span $active={tweets}>Tweets</Span>
        </Navigation>
        <Navigation onClick={() => setSelected({ tweets: false, tweetsReplies: true, media: false, likes: false })}>
          <Span $active={tweetsReplies}>Tweets & replies</Span>
        </Navigation>
        <Navigation onClick={() => setSelected({ tweets: false, tweetsReplies: false, media: true, likes: false })}>
          <Span $active={media}>Media</Span>
        </Navigation>
        <Navigation onClick={() => setSelected({ tweets: false, tweetsReplies: false, media: false, likes: true })}>
          <Span $active={likes}>Likes</Span>
        </Navigation>
      </NavigationWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: sticky;
  border-bottom: 2px solid ${Colors.darkerGrey};
  backdrop-filter: blur(10px);
`

const HeaderWrapper = styled.div`
  display: flex;
  text-align: start;
  justify-content: start;
`

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.3rem;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blackActive};
  }
`

const ArrowLogo = styled(ArrowLeft)`
  fill: ${Colors.textGray};
  width: 1.5rem;
  height: 1.5rem;
`

const TittleWrapper = styled.div`
  padding: 0.5rem 1rem 0.5rem 1rem;
`

const H3 = styled.h3`
  margin: 0;
  font-weight: 700;
  color: ${Colors.textGray};
`

const SpanHeader = styled.span`
  color: ${Colors.darkGray};
`

const CoverWrapper = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 200px;
  background-color: ${Colors.darkerGrey};
  ${props =>
    props.$backgroundImage &&
    `
      background-image: url(${props.$backgroundImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `}
`

const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  padding: 0.8rem 1rem;
  height: 85px;
`

const ImageWrapper = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  top: -5rem;
  left: 1rem;
  width: 10rem;
  height: 10rem;
  border: 4px solid ${Colors.black};
  border-radius: 50%;
  background-color: ${Colors.darkerGrey};
  ${props =>
    props.$backgroundImage &&
    `
      background-image: url(${props.$backgroundImage});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `}
`

// const EditProfileButton = styled(SecondaryButton)`
//   color: ${Colors.textGray};
//   padding-left: 0;
//   padding-right: 0;
// `

const BioWrapper = styled.div`
  padding: 0 1rem;
`

const TextWrapper = styled.div`
  padding-bottom: 1rem;
`

const H2Bio = styled.h2`
  margin: 0;
  color: ${Colors.textGray};
  font-weight: 700;
`

const SpanBio = styled.span`
  color: ${Colors.darkGray};
  font-weight: 500;
`

const SpanTextWrapper = styled.div`
  padding-bottom: 1rem;
`

const SpanText = styled.span`
  color: ${Colors.white};
  overflow-wrap: break-word;
`

const DescriptionWrapper = styled.div`
  padding-bottom: 1rem;
`

const LocationAndWebsiteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

const LocationLogo = styled(Location)`
  fill: ${Colors.darkGray};
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.3rem;
`

const WebLinkLogo = styled(WebLink)`
  fill: ${Colors.darkGray};
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1rem;
  margin-right: 0.3rem;
`

const WebLinkSpan = styled.a`
  color: ${Colors.primary};
  font-weight: 500;
  overflow-wrap: break-word;
  cursor: pointer;
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

const SocialStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding-bottom: 1rem;
`

const FollowingStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

const FollowersStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

const StatsNumberSpan = styled.span`
  color: ${Colors.textGray};
  font-weight: 700;
  padding-right: 0.3rem;
`

const StatsTextSpan = styled.span`
  color: ${Colors.darkGray};
  padding-right: 1rem;
`

const CanlenderLogo = styled(Calender)`
  fill: ${Colors.darkGray};
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.3rem;
`

const NavigationWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`

const Navigation = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blackActive};
  }
`

const Span = styled.div<{ $active: boolean }>`
  padding: 0.8rem 0;
  color: ${Colors.darkGray};
  font-weight: 600;

  ${props =>
    props.$active &&
    `
      border-bottom: 5px solid ${Colors.primary};
      color: ${Colors.textGray};
      font-weight: 800;
    `}
`
