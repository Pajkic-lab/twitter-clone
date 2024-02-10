import { Colors, TwitterLogo, appleLogo, googleLogo } from '@tw/ui/assets';
import { useState } from 'react';
import styled from 'styled-components';
import {
  PrimaryButton,
  SecondaryButton,
  SocialSignInButton,
} from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { ModalBase } from '../modal/ModalBase';
import { SignUpModalContent } from '../modal/signUpModal/SIgnUpModal';

/**
 * Google auth is being triggered this way because it does not make issue at backend when redirecting back to front,
 */

const googleLogin = () => {
  process.env.NODE_ENV == 'production'
    ? window.open('/auth/google/sign-in', '_self')
    : window.open('http://localhost:5000/auth/google/sign-in', '_self');
};

const appleLogin = () => {
  window.open('http://shorturl.at/nDFY3', '_blank');
};

export const LandingPageForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <ContentWrapper>
      <ContentSection>
        <Icon />

        <H1>Happening now</H1>

        <H3>Join Twitter today.</H3>

        <FormWrapper>
          <SocialButton onClick={googleLogin} leftIcon={googleLogo}>
            Sign up with Google
          </SocialButton>

          <SocialButton onClick={appleLogin} leftIcon={appleLogo}>
            Sign up with Apple
          </SocialButton>

          <Divider text={'or'} />

          <SignUpButton onClick={() => setModalIsOpen(!modalIsOpen)}>
            Sign up with email
          </SignUpButton>
          <ModalBase
            description={'Sign up Modal'}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            children={<SignUpModalContent setModalIsOpen={setModalIsOpen} />}
          />

          <PolicyTextWrapper>
            By signing up, you agree to the
            <SpanText>Terms of Service </SpanText>
            and <SpanText>Privacy Policy</SpanText>, including
            <SpanText> Cookie Use</SpanText>.
          </PolicyTextWrapper>
          <H4>Already have an account?</H4>
          <SignInButton /* onClick={() => setSignInModalIsOpen(!signInModalIsOpen)} */
          >
            Sign in
          </SignInButton>
        </FormWrapper>
        {/* <SignInModal
          signInModalIsOpen={signInModalIsOpen}
          setSignInModalIsOpen={setSignInModalIsOpen}
        /> */}
      </ContentSection>
    </ContentWrapper>
  );
};

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
`;

const Icon = styled(TwitterLogo)`
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

const SocialButton = styled(SocialSignInButton)`
  margin-bottom: 8px;
`;

const SignUpButton = styled(PrimaryButton)`
  margin-bottom: 5px;
`;

const SignInButton = styled(SecondaryButton)``;

const PolicyTextWrapper = styled.div`
  width: 300px;
  margin-bottom: 35px;
  color: ${Colors.graySecondary};
  font-size: 11px;
`;

const SpanText = styled.span`
  color: ${Colors.bluePrimary};
`;
