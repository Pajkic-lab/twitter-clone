import { UserResponseDto } from '@tw/data';
import { LocationIcon, WebLinkIcon, calenderIcon, colors } from '@tw/ui/assets';
import dayjs from 'dayjs';
import styled from 'styled-components';

interface PersonalInformationProps {
  user: UserResponseDto;
}

export const PersonalInformation = (props: PersonalInformationProps) => {
  const {
    user: { name, uniqueName, bio, createdAt, location, website },
  } = props;

  const formattedTime = dayjs(createdAt).format('MMMM YYYY');

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
          <CalenderLogo />
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
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const SpanBio = styled.span`
  color: ${colors.graySecondary};
  font-weight: 500;
`;

const SpanTextWrapper = styled.div`
  padding-bottom: 1rem;
`;

const SpanText = styled.span`
  color: ${colors.white};
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

const LocationLogo = styled(LocationIcon)`
  fill: ${colors.graySecondary};
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.3rem;
`;

const WebLinkLogo = styled(WebLinkIcon)`
  fill: ${colors.graySecondary};
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1rem;
  margin-right: 0.3rem;
`;

const WebLinkSpan = styled.a`
  color: ${colors.bluePrimary};
  font-weight: 500;
  overflow-wrap: break-word;
  cursor: pointer;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const CalenderLogo = styled(calenderIcon)`
  fill: ${colors.graySecondary};
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.3rem;
`;
