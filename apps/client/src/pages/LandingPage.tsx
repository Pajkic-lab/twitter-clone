import {
  Footer,
  LandingPageBackground,
  LandingPageForm,
  footerData,
} from '@tw/ui/components';
import styled from 'styled-components';

export const LandingPage = () => {
  return (
    <PageWrapper>
      <LayoutWrapper>
        <LandingPageBackground />
        <LandingPageForm />
      </LayoutWrapper>
      <Footer footerData={footerData} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  height: 100%;
`;
