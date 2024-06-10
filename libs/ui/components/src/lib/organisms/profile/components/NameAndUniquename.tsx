import { UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import styled from 'styled-components';

type NameAndUniquenameProps = Pick<
  UserResponseDto,
  'name' | 'uniqueName' | 'bio'
>;

export const NameAndUniquename = (props: NameAndUniquenameProps) => {
  const { name, uniqueName, bio } = props;
  return (
    <>
      <TextWrapper>
        <H2Bio>{name}</H2Bio>
        <SpanBio>{uniqueName}</SpanBio>
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

const H2Bio = styled.h2`
  margin: 0;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const SpanText = styled.span`
  color: ${colors.white};
  overflow-wrap: break-word;
`;

const SpanBio = styled.span`
  color: ${colors.graySecondary};
  font-weight: 500;
`;
