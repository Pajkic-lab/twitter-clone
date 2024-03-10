import { SocialStatsResponseDto, UserResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { NavigationBar } from '../../molecules/NavigationBar';
import { SignUpForm } from '../../molecules/SignUpForm';
import { AvatarAndOptions } from './components/AvatarAndOptions';
import { Cover } from './components/Cover';
import { PersonalInformation } from './components/PersonalInformation';
import { SocialStats } from './components/SocialStats';
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
  const {
    width,
    user: { name, id, avatar, cover },
    socialStats,
    profileActions,
    profileModal,
  } = props;

  return (
    <Wrapper>
      <NavigationBar name={name} width={width} height={NAVBAR_HEIGHT} />
      <Cover cover={cover} topMargin={NAVBAR_HEIGHT} />
      <AvatarAndOptions
        avatar={avatar}
        profileActions={profileActions}
        profileModal={profileModal}
      />
      <BioWrapper>
        <PersonalInformation user={props.user} />
        <SocialStats id={id} socialStats={socialStats} />
      </BioWrapper>
      <Tabs />

      <SignUpForm
        onSubmit={function (signUpFormData: {
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
        }): void {
          throw new Error('Function not implemented.');
        }}
        isPending={false}
      />

      <SignUpForm
        onSubmit={function (signUpFormData: {
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
        }): void {
          throw new Error('Function not implemented.');
        }}
        isPending={false}
      />

      <SignUpForm
        onSubmit={function (signUpFormData: {
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
        }): void {
          throw new Error('Function not implemented.');
        }}
        isPending={false}
      />

      <SignUpForm
        onSubmit={function (signUpFormData: {
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
        }): void {
          throw new Error('Function not implemented.');
        }}
        isPending={false}
      />

      <SignUpForm
        onSubmit={function (signUpFormData: {
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
        }): void {
          throw new Error('Function not implemented.');
        }}
        isPending={false}
      />

      <SignUpForm
        onSubmit={function (signUpFormData: {
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
        }): void {
          throw new Error('Function not implemented.');
        }}
        isPending={false}
      />
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
