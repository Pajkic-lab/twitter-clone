import { SearchUsersResponseDto } from '@tw/data';
import { Colors } from '@tw/ui/assets';
import styled from 'styled-components';

type SingleUserProps = {
  user: SearchUsersResponseDto;
};

/**
 * This component does not have final shape
 * It is intended to represent single user from user list.
 * Should be polymeric, and will be probably changed in future.
 */
export const SingleUser = (props: SingleUserProps) => {
  const {
    user: { name, uniqueName, avatar },
  } = props;

  return (
    <BioWrapper>
      <ProfileImage $backgroundImage={avatar} />
      <TextWrapper>
        <H3>{name}</H3>
        <Span>{uniqueName}</Span>
      </TextWrapper>
    </BioWrapper>
  );
};

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
  background-color: ${Colors.bluePrimary};

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
  color: ${Colors.grayPrimary};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  padding-left: 0.8rem;
  color: ${Colors.graySecondary};
  font-weight: 500;
`;
