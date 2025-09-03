import { colors, OptionsIcon } from '@tw/ui/assets';
import styled from 'styled-components';

type SideBarOptionsButtonProps = {
  avatar: string;
  name: string;
  uniqueName: string;
  collapsed: boolean;
};

export const SideBarOptionsButton = (props: SideBarOptionsButtonProps) => {
  const { name, uniqueName, avatar, collapsed } = props;

  return (
    <Wrapper collapsed={collapsed}>
      <BioWrapper>
        <ProfileImage $backgroundImage={avatar} />
        {!collapsed && (
          <div>
            <H3>{name}</H3>
            <Span>{uniqueName}</Span>
          </div>
        )}
      </BioWrapper>
      {!collapsed && <Options />}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ collapsed: boolean }>`
  display: flex;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'space-between')};
  align-items: center;
  border-radius: 5rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
`;

const BioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>`
  border-radius: 100%;
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${colors.bluePrimary};
  margin: 0.8rem;

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

const H3 = styled.h3`
  margin: 0;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  color: ${colors.graySecondary};
  font-weight: 500;
`;

const Options = styled(OptionsIcon)`
  fill: ${colors.grayPrimary};
  width: 2rem;
  height: 2rem;
`;
