import { SocialStatsResponseDto, UserResponseDto } from '@tw/data';
import { Tabs } from '@tw/ui/components';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { NavigationBar } from '../../molecules/NavigationBar';
import { AvatarAndOptions } from './components/AvatarAndOptions';
import { Cover } from './components/Cover';
import { ProfileInfo } from './components/ProfileInfo';

type ProfileProps = {
  width: number;
  user: UserResponseDto;
  socialStats: SocialStatsResponseDto | undefined;
  profileActions: ReactNode;
  profileModal?: ReactNode;
};

const NAVBAR_HEIGHT = 4.286; //rem

const tabs = [
  { content: null, tabName: 'Posts' },
  { content: null, tabName: 'Replies' },
  { content: null, tabName: 'Highlights' },
  { content: null, tabName: 'Articles' },
  { content: null, tabName: 'Media' },
  { content: null, tabName: 'Links' },
];

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
      <Tabs tabs={tabs} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const BioWrapper = styled.div`
  padding: 0 1rem;
`;
