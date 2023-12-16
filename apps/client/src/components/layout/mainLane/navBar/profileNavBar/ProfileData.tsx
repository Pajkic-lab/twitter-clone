import { ReactComponent as Location } from '../../../../../assets/svg/location.svg';
import { ReactComponent as Calender } from '../../../../../assets/svg/calender.svg';
import { ReactComponent as WebLink } from '../../../../../assets/svg/webLink.svg';
import styled from 'styled-components';
import moment from 'moment';
import React from 'react';
import { Colors } from 'apps/client/src/ui/styles';

interface Props {
  name: string;
  uniqueName: string;
  bio: string;
  location: string;
  website: string;
  createdAt: string | Date;
}

export const ProfileData: React.FC<Props> = ({
  name,
  uniqueName,
  bio,
  location,
  website,
  createdAt,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const formattedTime = moment(createdAt).format('MMMM YYYY');
  return (
    <>
      <TextWrapper>
        <H2Bio>{name}</H2Bio>
        <SpanBio>{uniqueName}</SpanBio>
      </TextWrapper>

      <SpanTextWrapper>
        <SpanText>{bio}</SpanText>
      </SpanTextWrapper>

      <DescriptionWrapper>
        <LocationAndWebsiteWrapper>
          {location && <LocationLogo />}
          <SpanBio>{location}</SpanBio>
          {website && <WebLinkLogo />}
          <WebLinkSpan href={website} target="_blank">
            {website}
          </WebLinkSpan>
        </LocationAndWebsiteWrapper>
        <DateWrapper>
          <CanlenderLogo />
          <SpanBio>Joined {formattedTime}</SpanBio>
        </DateWrapper>
      </DescriptionWrapper>
    </>
  );
};

const TextWrapper = styled.div`
  padding-bottom: 1rem;
`;

const H2Bio = styled.h2`
  margin: 0;
  color: ${Colors.textGray};
  font-weight: 700;
`;

const SpanBio = styled.span`
  color: ${Colors.darkGray};
  font-weight: 500;
`;

const SpanTextWrapper = styled.div`
  padding-bottom: 1rem;
`;

const SpanText = styled.span`
  color: ${Colors.white};
  overflow-wrap: break-word;
`;

const DescriptionWrapper = styled.div`
  padding-bottom: 1rem;
`;

const LocationAndWebsiteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const LocationLogo = styled(Location)`
  fill: ${Colors.darkGray};
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.3rem;
`;

const WebLinkLogo = styled(WebLink)`
  fill: ${Colors.darkGray};
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1rem;
  margin-right: 0.3rem;
`;

const WebLinkSpan = styled.a`
  color: ${Colors.primary};
  font-weight: 500;
  overflow-wrap: break-word;
  cursor: pointer;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const CanlenderLogo = styled(Calender)`
  fill: ${Colors.darkGray};
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.3rem;
`;
