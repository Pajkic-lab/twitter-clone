import { UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import styled from 'styled-components';

type NameAndUniquenameProps = Pick<
  UserResponseDto,
  'name' | 'uniqueName' | 'bio'
> & {
  navigateToUser?: () => void;
};

export const NameAndUniquename = (props: NameAndUniquenameProps) => {
  const { name, uniqueName, bio, navigateToUser } = props;
  return (
    <>
      <TextWrapper>
        <H2Bio onClick={navigateToUser}>{name}</H2Bio> <br />
        <SpanBio onClick={navigateToUser}>{uniqueName}</SpanBio>
      </TextWrapper>
      {bio && (
        <TextWrapper>
          <SpanText>{bio}</SpanText>
        </TextWrapper>
      )}
    </>
  );
};

const TextWrapper = styled.div`
  padding-bottom: 1rem;
`;

const H2Bio = styled.span`
  margin: 0;
  color: ${colors.grayPrimary};
  font-weight: 700;
  font-size: x-large;
  cursor: pointer;
`;

const SpanText = styled.span`
  color: ${colors.white};
  overflow-wrap: break-word;
`;

const SpanBio = styled.span`
  color: ${colors.graySecondary};
  font-weight: 500;
  cursor: pointer;
`;
