import { SocialStatsResponseDto, UserResponseDto } from '@tw/data';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { DateAndTime } from './DateAndTime';
import { LocationAndWebsite } from './LocationAndWebsite';
import { NameAndUniquename } from './NameAndUniquename';
import { SocialStats } from './SocialStats';

interface ProfileInfoProps {
  user: UserResponseDto;
  socialStats: SocialStatsResponseDto | undefined;
}

export const ProfileInfo = (props: ProfileInfoProps) => {
  const { user, socialStats } = props;
  const { id, name, uniqueName, bio, createdAt, location, website } = user;

  const formattedTime = dayjs(createdAt).format('MMMM YYYY');

  return (
    <Wrapper>
      <NameAndUniquename name={name} uniqueName={uniqueName} bio={bio} />
      <LocationAndWebsite website={website} location={location} />
      <DateAndTime formattedTime={formattedTime} />
      <SocialStats socialStats={socialStats} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 1rem 1rem;
`;
