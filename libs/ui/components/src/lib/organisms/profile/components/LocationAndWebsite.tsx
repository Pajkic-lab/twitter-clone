import { UserResponseDto } from '@tw/data';
import { LocationIcon, WebLinkIcon, colors } from '@tw/ui/assets';
import styled from 'styled-components';

type LocationAndWebsiteProps = Pick<UserResponseDto, 'location' | 'website'>;

export const LocationAndWebsite = (props: LocationAndWebsiteProps) => {
  const { location, website } = props;

  return (
    <LocationAndWebsiteWrapper>
      {location && <LocationLogo />}
      <SpanBio>{location}</SpanBio>
      {website && <WebLinkLogo />}
      <WebLinkSpan href={website} target="_blank">
        {website}
      </WebLinkSpan>
    </LocationAndWebsiteWrapper>
  );
};

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

const SpanBio = styled.span`
  color: ${colors.graySecondary};
  font-weight: 500;
`;
