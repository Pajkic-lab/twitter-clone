import {
  Colors,
  TwitterIcon,
  appleLogo,
  googleLogo,
  landingPageBackground,
} from '@tw/ui/assets';
import {
  Divider,
  Footer,
  Modal,
  PrimaryButton,
  SecondaryButton,
  SignInForm,
  SignInFormData,
  SignUpForm,
  SignUpFormData,
  SocialSignInButton,
  footerData,
} from '@tw/ui/components';
import { useSignInMutation, useSignUpMutation } from '@tw/ui/data-access';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export const LandingPage = () => {
  const signInMutation = useSignInMutation();
  const signUpMutation = useSignUpMutation();

  /**
   * Google auth is being triggered this way because it does not make issue at backend when redirecting back to front,
   * solutions should be researched and implemented
   */
  const googleLogin = () => {
    process.env.NODE_ENV == 'production'
      ? window.open('/auth/google/sign-in', '_self')
      : window.open('http://localhost:5000/auth/google/sign-in', '_self');
  };
  const appleLogin = () => {
    window.open('http://shorturl.at/nDFY3', '_blank');
  };

  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState<boolean>(false);
  const [signInModalIsOpen, setSignInModalIsOpen] = useState<boolean>(false);

  const signUpFormOnSubmit = useCallback(
    (signUpFormData: SignUpFormData) => {
      signUpMutation.mutate(signUpFormData);
    },
    [signUpMutation]
  );

  const signInFormOnSubmit = useCallback(
    (signInFormData: SignInFormData) => {
      signInMutation.mutate(signInFormData);
    },
    [signInMutation]
  );

  return (
    <PageWrapper>
      <LayoutWrapper>
        <LogoWrapper>
          <CoveringPageLogo />
        </LogoWrapper>

        <ContentWrapper>
          <ContentSection>
            <Icon />

            <H1>Happening now</H1>
            <H3>Join Twitter today.</H3>

            <FormWrapper>
              <SocialSignInButton onClick={googleLogin} leftIcon={googleLogo}>
                Sign up with Google
              </SocialSignInButton>

              <SocialSignInButton onClick={appleLogin} leftIcon={appleLogo}>
                Sign up with Apple
              </SocialSignInButton>

              <Divider text={'or'} />

              <PrimaryButton
                onClick={() => setSignUpModalIsOpen(!signUpModalIsOpen)}
              >
                Sign up with email
              </PrimaryButton>
              <Modal
                hasCloseButton
                modalIsOpen={signUpModalIsOpen}
                setModalIsOpen={() => setSignUpModalIsOpen(!signUpModalIsOpen)}
                actions={[<TwLogo key={uuid()} />]}
                actionsContentAlinement={'center'}
              >
                <SignUpForm
                  onSubmit={signUpFormOnSubmit}
                  isPending={signUpMutation.isPending}
                  errorMessage={signUpMutation.error?.message}
                />
              </Modal>

              <PolicyTextWrapper>
                By signing up, you agree to the
                <SpanText>Terms of Service </SpanText>
                and <SpanText>Privacy Policy</SpanText>, including
                <SpanText> Cookie Use</SpanText>.
              </PolicyTextWrapper>
              <H4>Already have an account?</H4>

              <SecondaryButton
                onClick={() => setSignInModalIsOpen(!signInModalIsOpen)}
              >
                Sign in
              </SecondaryButton>
              <Modal
                hasCloseButton
                modalIsOpen={signInModalIsOpen}
                setModalIsOpen={() => setSignInModalIsOpen(!signInModalIsOpen)}
                actions={[<TwLogo key={uuid()} />]}
                actionsContentAlinement={'center'}
              >
                <SignInForm
                  onSubmit={signInFormOnSubmit}
                  isPending={signInMutation.isPending}
                  errorMessage={signInMutation.error?.message}
                />
              </Modal>
            </FormWrapper>
          </ContentSection>
        </ContentWrapper>
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

const CoveringPageLogo = styled(TwitterIcon)`
  fill: ${Colors.white};
  width: 470px;
  height: 470px;

  @media (max-width: 1200px) {
    width: 75%;
    height: 75%;
  }
`;

const TwLogo = styled(TwitterIcon)`
  fill: ${Colors.grayLight};
  width: 2.5rem;
  height: 2.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 46vw;
  min-width: 600px;
  padding-left: 35px;
  background-color: ${Colors.black};
`;

const ContentSection = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  width: 21rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  & > * {
    margin-bottom: 1rem;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;

const Icon = styled(TwitterIcon)`
  width: 56px;
  height: 56px;
  fill: ${Colors.grayPrimary};
`;

const H1 = styled.h1`
  padding-top: 10px;
  margin-bottom: 8px;
  font-size: 62px;
  font-weight: 900;
  font-family: 'chip-bold';
  transform-origin: 0 0;
  transform: scaleY(1.8);
  transform: scaleX(1.3);
  letter-spacing: -3px;
  color: ${Colors.grayLight};
`;

const H3 = styled.h3`
  margin-bottom: 28px;
  font-size: 30px;
  font-weight: 900;
  transform-origin: 0 0;
  transform: scaleY(1.8);
  transform: scaleX(1.4);
  transform-origin: 0 0;
  letter-spacing: -1px;
  color: ${Colors.grayLight};
`;

const H4 = styled.h4`
  margin-bottom: 18px;
  font-weight: 600;
  font-size: 18px;
  color: ${Colors.grayLight};
`;

const PolicyTextWrapper = styled.div`
  width: 300px;
  color: ${Colors.graySecondary};
  font-size: 11px;
`;

const SpanText = styled.span`
  color: ${Colors.bluePrimary};
`;
