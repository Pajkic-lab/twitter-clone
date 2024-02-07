import { Colors, TwitterLogo, landingPageBackground } from '@tw/ui/assets';
import styled from 'styled-components';

export const LandingPageBackground = () => {
  return (
    <LogoWrapper>
      <LogoSvg />
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 46vw);
  height: 100%;
  background-image: url(${landingPageBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const LogoSvg = styled(TwitterLogo)`
  width: 470px;
  height: 470px;
  fill: ${Colors.white};

  @media (max-width: 1200px) {
    width: 75%;
    height: 75%;
  }
`;
