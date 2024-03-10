import { MostPopularUsersResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import styled from 'styled-components';
import { Loader } from '../atoms/Loader';
import { SingleUser } from '../atoms/SingleUser';

/**
 * Unify following DTO, in order to share component access data:
 * FollowerListResponseDto FollowingListResponseDto MostPopularUsersResponseDto SearchUsersResponseDto
 */
type UserLIstProps = {
  users: MostPopularUsersResponseDto[] | undefined; // This Dto must be unified, read comment above
  userListLoading?: boolean;
  title?: string;
  noDataText?: string;
};

type NoDataUiProps = {
  noDataText: string;
};

type ContentUiProps = {
  users: MostPopularUsersResponseDto[];
  title?: string;
};

export const UserLIst = (props: UserLIstProps) => {
  const {
    users,
    userListLoading,
    title,
    noDataText = 'No matching data',
  } = props;

  return (
    <Wrapper>
      {users && <ContentUi users={users} title={title} />}
      {!userListLoading && !users?.length && (
        <NoDataUi noDataText={noDataText} />
      )}
      {userListLoading && !users?.length && <LoaderUi />}
    </Wrapper>
  );
};

const ContentUi = (props: ContentUiProps) => {
  const { title, users } = props;
  return (
    <ContentWrapper>
      {title && <Title>{title}</Title>}
      {users.map((user) => (
        <SingleUser key={user.id} user={user} />
      ))}
    </ContentWrapper>
  );
};

const NoDataUi = (props: NoDataUiProps) => {
  const { noDataText } = props;
  return (
    <NoResultWrapper>
      <H3>{noDataText}</H3>
    </NoResultWrapper>
  );
};

const LoaderUi = () => {
  return (
    <LoaderWrapper>
      <LoaderCustom />
    </LoaderWrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoaderCustom = styled(Loader)`
  width: 2rem;
  height: 2rem;
`;

const Title = styled.h2`
  color: ${colors.white};
  font-weight: 700;
  padding-left: 1rem;
  margin: 1rem 0;
`;

const NoResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;
