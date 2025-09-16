import { SocialStatsResponseDto, UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { NavigationBar } from '../../molecules/NavigationBar';
import { AvatarAndOptions } from './components/AvatarAndOptions';
import { Cover } from './components/Cover';
import { ProfileInfo } from './components/ProfileInfo';
import { Tabs } from './components/Tabs';

type ProfileProps = {
  width: number;
  user: UserResponseDto;
  socialStats: SocialStatsResponseDto | undefined;
  profileActions: ReactNode;
  profileModal?: ReactNode;
};

const NAVBAR_HEIGHT = 4.286; //rem

export const Profile = (props: ProfileProps) => {
  const { width, user, socialStats, profileActions, profileModal } = props;
  const { name, id, uniqueName, avatar, cover } = user;

  return (
    <Wrapper>
      <NavigationBar title={name} text={uniqueName} width={width} height={NAVBAR_HEIGHT} />
      <Cover cover={cover} topMargin={NAVBAR_HEIGHT} />
      <AvatarAndOptions
        avatar={avatar}
        profileActions={profileActions}
        profileModal={profileModal}
      />
      <ProfileInfo user={user} socialStats={socialStats} />
      <Tabs />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 2px solid ${colors.grayDark};
  position: relative;
`;

const BioWrapper = styled.div`
  padding: 0 1rem;
`;
