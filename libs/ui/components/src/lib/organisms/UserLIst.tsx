import { FollowerListResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Loader } from '../atoms/Loader';
import { SingleUser } from '../atoms/SingleUser';

type UserListProps = {
  users: FollowerListResponseDto[] | undefined;
  userListLoading?: boolean;
  title?: string;
  noDataText?: string;
  scrollable?: boolean;
  infScrollElRef?: (node?: Element | null | undefined) => void;
  hasMoreData?: boolean;
  meId: number;
};

type ContentUiProps = {
  meId: number;
  users: FollowerListResponseDto[];
  title?: string;
};

type NoDataUiProps = {
  noDataText: string;
  scrollable?: boolean;
};

type LoaderUiProps = {
  scrollable?: boolean;
};

export const UserLIst = (props: UserListProps) => {
  const {
    users,
    userListLoading,
    title,
    noDataText = 'No matching data.',
    scrollable = false,
    infScrollElRef,
    hasMoreData,
    meId,
  } = props;

  const memoizedValues = useMemo(() => {
    const scrollLoader = userListLoading;
    const scrollNoData = !hasMoreData && !userListLoading;

    const defaultLoader = userListLoading! && !users?.length;
    const defaultNoData = !userListLoading && !users?.length;

    const showLoader = scrollable ? scrollLoader : defaultLoader;
    const showNoData = scrollable ? scrollNoData : defaultNoData;

    return { showLoader, showNoData };
  }, [userListLoading, users, hasMoreData, scrollable]);

  const { showLoader, showNoData } = memoizedValues;

  return (
    <Wrapper>
      {users && <ContentUi meId={meId} users={users} title={title} />}

      {scrollable && <InfScrollElTrigger ref={infScrollElRef} />}

      {showLoader && <LoaderUi scrollable={scrollable} />}

      {showNoData && (
        <NoDataUi scrollable={scrollable} noDataText={noDataText} />
      )}
    </Wrapper>
  );
};

const ContentUi = memo((props: ContentUiProps) => {
  const { meId, title, users } = props;
  return (
    <ContentWrapper>
      {title && <Title>{title}</Title>}
      {users.map((user) => (
        <SingleUser key={user.id} meId={meId} user={user} />
      ))}
    </ContentWrapper>
  );
});

const NoDataUi = memo((props: NoDataUiProps) => {
  const { noDataText, scrollable } = props;
  return (
    <NoResultWrapper scrollable={scrollable}>
      <H3>{noDataText}</H3>
    </NoResultWrapper>
  );
});

const LoaderUi = memo((props: LoaderUiProps) => {
  const { scrollable } = props;
  return (
    <LoaderWrapper scrollable={scrollable}>
      <LoaderCustom />
    </LoaderWrapper>
  );
});

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

const LoaderWrapper = styled.div<{ scrollable?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ scrollable }) => (scrollable ? '5rem' : '100%')};
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

const NoResultWrapper = styled.div<{ scrollable?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ scrollable }) => (scrollable ? '5rem' : '100%')};
`;

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

/*
 * InfScrollElTrigger purpose is to trigger inf scroll
 */
const InfScrollElTrigger = styled.div`
  width: 1px;
  height: 1px;
  background-color: ${colors.black};
`;
