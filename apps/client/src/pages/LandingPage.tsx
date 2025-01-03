import {
  TwitterIcon,
  appleLogoImg,
  colors,
  googleLogoImg,
  landingPageBackgroundImg,
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
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState<boolean>(false);
  const [signInModalIsOpen, setSignInModalIsOpen] = useState<boolean>(false);

  const {
    mutate: signInMutate,
    isPending: signInLoading,
    error: signInError,
  } = useSignInMutation();

  const {
    mutate: signUpMutate,
    isPending: signUpLoading,
    error: signUpError,
  } = useSignUpMutation();

  const signUpFormOnSubmit = useCallback(
    (signUpFormData: SignUpFormData) => {
      signUpMutate(signUpFormData);
    },
    [signUpMutate]
  );

  const signInFormOnSubmit = useCallback(
    (signInFormData: SignInFormData) => {
      signInMutate(signInFormData);
    },
    [signInMutate]
  );

  /**
   * Google auth is being triggered this way because it does not make issue at backend when redirecting back to front,
   * solutions should be researched and implemented
   */
  const googleSignIn = () => {
    process.env.NODE_ENV == 'production'
      ? window.open('/auth/google/sign-in', '_self')
      : window.open('http://localhost:5000/auth/google/sign-in', '_self');
  };
  const appleSignIn = () => {
    window.open('http://shorturl.at/nDFY3', '_blank');
  };

  const handleSignUpModal = useCallback(() => {
    setSignUpModalIsOpen(!signUpModalIsOpen);
  }, [signUpModalIsOpen]);

  const handleSignInModal = useCallback(() => {
    setSignInModalIsOpen(!signInModalIsOpen);
  }, [signInModalIsOpen]);

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
              <SocialSignInButton
                onClick={googleSignIn}
                leftIcon={googleLogoImg}
              >
                Sign up with Google
              </SocialSignInButton>

              <SocialSignInButton onClick={appleSignIn} leftIcon={appleLogoImg}>
                Sign up with Apple
              </SocialSignInButton>

              <Divider text={'or'} />

              <PrimaryButton onClick={handleSignUpModal}>
                Sign up with email
              </PrimaryButton>
              <Modal
                hasCloseButton
                modalIsOpen={signUpModalIsOpen}
                actionsContentAlinement={'center'}
                actions={[<TwLogo key={uuid()} />]}
                setModalIsOpen={handleSignUpModal}
              >
                <SignUpForm
                  onSubmit={signUpFormOnSubmit}
                  isPending={signUpLoading}
                  error={signUpError}
                />
              </Modal>

              <PolicyTextWrapper>
                By signing up, you agree to the
                <SpanText>Terms of Service </SpanText>
                and <SpanText>Privacy Policy</SpanText>, including
                <SpanText> Cookie Use</SpanText>.
              </PolicyTextWrapper>
              <H4>Already have an account?</H4>

              <SecondaryButton onClick={handleSignInModal}>
                Sign in
              </SecondaryButton>
              <Modal
                hasCloseButton
                modalIsOpen={signInModalIsOpen}
                actionsContentAlinement={'center'}
                actions={[<TwLogo key={uuid()} />]}
                setModalIsOpen={handleSignInModal}
              >
                <SignInForm
                  onSubmit={signInFormOnSubmit}
                  isPending={signInLoading}
                  error={signInError}
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
  background-image: url(${landingPageBackgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const CoveringPageLogo = styled(TwitterIcon)`
  fill: ${colors.white};
  width: 470px;
  height: 470px;

  @media (max-width: 1200px) {
    width: 75%;
    height: 75%;
  }
`;

const TwLogo = styled(TwitterIcon)`
  fill: ${colors.grayLight};
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
  background-color: ${colors.black};
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
  fill: ${colors.grayPrimary};
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
  color: ${colors.grayLight};
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
  color: ${colors.grayLight};
`;

const H4 = styled.h4`
  margin-bottom: 18px;
  font-weight: 600;
  font-size: 18px;
  color: ${colors.grayLight};
`;

const PolicyTextWrapper = styled.div`
  width: 300px;
  color: ${colors.graySecondary};
  font-size: 11px;
`;

const SpanText = styled.span`
  color: ${colors.bluePrimary};
`;
