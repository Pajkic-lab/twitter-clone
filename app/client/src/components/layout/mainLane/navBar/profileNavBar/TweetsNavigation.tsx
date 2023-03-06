import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from 'ui/styles'

export const TweetsNavigation = () => {
  const [selected, setSelected] = useState({
    tweets: true,
    tweetsReplies: false,
    media: false,
    likes: false,
  })
  const { tweets, tweetsReplies, media, likes } = selected

  return (
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
  )
}

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
