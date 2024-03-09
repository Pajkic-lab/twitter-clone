import { MostPopularUsersResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import styled from 'styled-components';
import { Loader } from '../atoms/Loader';
import { SingleUser } from '../atoms/SingleUser';

type WhoToFollowProps = {
  mostPopularUsers: MostPopularUsersResponseDto[] | undefined;
  isMostPopularUsersLoading: boolean;
  title: string;
};

/**
 * This component will be design for single use case,
 * it will be transformed to polymorphic component
 */

export const WhoToFollow = (props: WhoToFollowProps) => {
  const { mostPopularUsers, isMostPopularUsersLoading, title } = props;

  return (
    <Wrapper>
      {mostPopularUsers && (
        <ContentWrapper>
          <Title>{title}</Title>
          {mostPopularUsers.map((user) => (
            <SingleUser key={user.id} user={user} />
          ))}
        </ContentWrapper>
      )}
      {isMostPopularUsersLoading && !mostPopularUsers && (
        <LoaderWrapper>
          <LoaderCustom />
        </LoaderWrapper>
      )}
    </Wrapper>
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
