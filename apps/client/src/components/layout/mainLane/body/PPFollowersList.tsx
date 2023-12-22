// import { followUserThunk, unFollowUserThunk } from 'store/features/authSlice/thunk'
// import { getPPFollowersThunk } from 'store/features/utileSlice/thunk'
// import { useAppDispatch, useAppSelector } from 'store/hooks'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
// import { SecondaryButton } from 'ui/Button'
import styled from 'styled-components';
// import { Loader } from 'ui/Loader'
// import { Colors } from 'ui/styles'
import {
  followUserThunk,
  getPPFollowersThunk,
  unFollowUserThunk,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import { SecondaryButton } from 'apps/client/src/ui/Button';
import { Loader } from 'apps/client/src/ui/Loader';
import { Colors } from 'apps/client/src/ui/styles';
import React from 'react';

export const PPFollowersList: React.FC<{ userId: number }> = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    PPfollowerListIsLoading,
    PPfollowersList,
    PPfollowerOffset,
    PPfollowerLimit,
    PPfollowerHasMore,
  } = useAppSelector((state) => state.utile);

  const { followIsSubmitting } = useAppSelector((state) => state.publicProfile);

  const { id } = useAppSelector((state) => state.auth);

  const followUserHelper = (userId: number) => {
    void dispatch(followUserThunk({ userId }));
  };

  const unFollowUserHelper = (userId: number) => {
    void dispatch(unFollowUserThunk({ userId }));
  };

  const navigateToProfile = (userId: number, uniqueName: string) => {
    if (userId === id) {
      navigate('/profile');
    } else {
      navigate(`/user/${userId}/unique-name/${uniqueName}`);
    }
  };

  return (
    <Wrapper>
      <InfiniteScroll
        hasMore={PPfollowerHasMore}
        next={() => {
          void dispatch(
            getPPFollowersThunk({ userId, PPfollowerOffset, PPfollowerLimit })
          );
        }}
        loader={<>loading...</>}
        dataLength={PPfollowersList.length}
        endMessage={
          <NoResultWrapper>
            <H3>End of followers list</H3>
          </NoResultWrapper>
        }
      >
        {PPfollowersList &&
          PPfollowersList.map((user) => (
            <ProfileButtonWrapper
              key={user.id}
              onClick={() => navigateToProfile(user.id!, user.uniqueName)}
            >
              <BioWrapper>
                <ProfileImage $backgroundImage={user.avatar && user.avatar} />
                <TextWrapper>
                  <H3>{user.name}</H3>
                  <Span>{user.uniqueName}</Span>
                </TextWrapper>
              </BioWrapper>
              {/*  */}

              {user.id === id ? (
                <></>
              ) : user.followingStatus ? (
                <UnFolloweButton
                  onClick={(e) => {
                    e.stopPropagation();
                    unFollowUserHelper(user.id!);
                  }}
                  loading={followIsSubmitting}
                >
                  UnFollow
                </UnFolloweButton>
              ) : (
                <FolloweButton
                  onClick={(e) => {
                    e.stopPropagation();
                    followUserHelper(user.id!);
                  }}
                  loading={followIsSubmitting}
                >
                  Follow
                </FolloweButton>
              )}

              {/*  */}
            </ProfileButtonWrapper>
          ))}

        {PPfollowerListIsLoading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
      </InfiniteScroll>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  cursor: pointer;
`;

const BioWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.3rem;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>`
  border-radius: 100%;
  width: 3.2rem;
  height: 3.2rem;
  background-color: ${Colors.primary};

  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${Colors.black};
  `}
`;

const TextWrapper = styled.div``;

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${Colors.textGray};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  padding-left: 0.8rem;
  color: ${Colors.darkGray};
  font-weight: 500;
`;

const FolloweButton = styled(SecondaryButton)`
  color: ${Colors.black};
  background-color: ${Colors.white};
  padding-left: 0;
  padding-right: 0;

  &:hover {
    color: ${Colors.white};
  }
`;
const UnFolloweButton = styled(SecondaryButton)`
  color: ${Colors.textGray};
  padding-left: 0;
  padding-right: 0;

  &:hover {
    color: ${Colors.red};
    border: 1px solid ${Colors.red};
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NoResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
`;
