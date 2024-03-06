import { colors } from '@tw/ui/assets';
import { Loader, SecondaryButton } from '@tw/ui/components';
import {
  followUserThunk,
  getMostPopularProfiles,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const WhoToFollow = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    mostPopularUsers,
    mostPopularUsersIsLoading: mostPupularUsersIsLoading,
  } = useAppSelector((state) => state.utile);
  const { followIsSubmitting } = useAppSelector((state) => state.publicProfile);

  const followUserHelper = (userId: number) => {
    void dispatch(followUserThunk({ userId }));
  };

  useEffect(() => {
    void dispatch(getMostPopularProfiles());
  }, []);

  const navigateToProfile = (userId: number, uniqueName: string) => {
    navigate(`/user/${userId}/unique-name/${uniqueName}`);
  };

  return (
    <Wrapper>
      <TittleWrapper>
        <H2>Who to follow</H2>
      </TittleWrapper>

      {mostPopularUsers &&
        mostPopularUsers.map((user) => (
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
            <FolloweButton
              onClick={(e) => {
                e.stopPropagation();
                followUserHelper(user.id!);
              }}
              loading={followIsSubmitting}
            >
              Follow
            </FolloweButton>
          </ProfileButtonWrapper>
        ))}

      {mostPupularUsersIsLoading && mostPopularUsers.length < 1 && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TittleWrapper = styled.div`
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

const H2 = styled.h2`
  margin: 0;
  font-weight: 700;
  color: ${colors.grayPrimary};
`;

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
  background-color: ${colors.bluePrimary};

  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${colors.black};
  `}
`;

const TextWrapper = styled.div``;

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.graySecondary};
  font-weight: 500;
`;

const FolloweButton = styled(SecondaryButton)`
  color: ${colors.black};
  background-color: ${colors.white};
  padding-left: 0;
  padding-right: 0;

  &:hover {
    color: ${colors.white};
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
