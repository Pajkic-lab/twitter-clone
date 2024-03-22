import { colors } from '@tw/ui/assets';
import { useState } from 'react';
import styled from 'styled-components';

/**
 * This component is for now place holder,
 * It should be polymorphic and it should be used for every tab need.
 */
export const Tabs = () => {
  const [selected, setSelected] = useState({
    tweets: true,
    tweetsReplies: false,
    media: false,
    likes: false,
  });
  const { tweets, tweetsReplies, media, likes } = selected;

  return (
    <NavigationWrapper>
      <Navigation
        onClick={() =>
          setSelected({
            tweets: true,
            tweetsReplies: false,
            media: false,
            likes: false,
          })
        }
      >
        <Span $active={tweets}>Tweets</Span>
      </Navigation>
      <Navigation
        onClick={() =>
          setSelected({
            tweets: false,
            tweetsReplies: true,
            media: false,
            likes: false,
          })
        }
      >
        <Span $active={tweetsReplies}>Tweets & replies</Span>
      </Navigation>
      <Navigation
        onClick={() =>
          setSelected({
            tweets: false,
            tweetsReplies: false,
            media: true,
            likes: false,
          })
        }
      >
        <Span $active={media}>Media</Span>
      </Navigation>
      <Navigation
        onClick={() =>
          setSelected({
            tweets: false,
            tweetsReplies: false,
            media: false,
            likes: true,
          })
        }
      >
        <Span $active={likes}>Likes</Span>
      </Navigation>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

const Navigation = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
`;

const Span = styled.div<{ $active: boolean }>`
  padding: 0.8rem 0;
  color: ${colors.graySecondary};
  font-weight: 600;

  ${(props) =>
    props.$active &&
    `
        border-bottom: 5px solid ${colors.bluePrimary};
        color: ${colors.grayPrimary};
        font-weight: 800;
      `}
`;
