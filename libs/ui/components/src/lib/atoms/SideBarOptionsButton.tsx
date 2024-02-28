import { Colors, OptionsIcon } from '@tw/ui/assets';
import styled from 'styled-components';

type SideBarOptionsButtonProps = {
  avatar: string;
  name: string;
  uniqueName: string;
};

export const SideBarOptionsButton = (props: SideBarOptionsButtonProps) => {
  const { avatar, name, uniqueName } = props;

  return (
    <>
      <BioWrapper>
        <ProfileImage $backgroundImage={avatar} />
        <div>
          <H3>{name}</H3>
          <Span>{uniqueName}</Span>
        </div>
      </BioWrapper>
      <Options />
    </>
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
  width: 2.8rem;
  height: 2.8rem;
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

const Options = styled(OptionsIcon)`
  fill: ${Colors.grayPrimary};
  width: 2rem;
  height: 2rem;
`;
