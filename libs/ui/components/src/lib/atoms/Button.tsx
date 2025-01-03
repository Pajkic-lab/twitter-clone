import { colors } from '@tw/ui/assets';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean;
  disabled?: boolean;
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, leftIcon, rightIcon, disabled, loading, type, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        type={type ?? 'button'}
        {...props}
      >
        {leftIcon ? <img src={leftIcon} /> : null}
        <span>{loading ? <ButtonLoader /> : children}</span>
        {rightIcon ? <img src={rightIcon} /> : null}
      </button>
    );
  }
);

export const ButtonBase = styled(ButtonComponent)<{
  $width?: number;
  $height?: number;
  $iconsize?: number;
}>`
  width: 100%;
  height: 40px;
  padding: 0 1rem;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  width: ${({ $width }) => $width}rem;
  height: ${({ $height }) => $height}rem;

  &[disabled] {
    pointer-events: none;
    background-color: ${colors.grayLight};
    color: ${colors.grayPrimary};
    border: 0;
  }

  img {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    width: 1.1rem;
    height: 1.1rem;

    width: ${({ $iconsize }) => $iconsize}rem;
    height: ${({ $iconsize }) => $iconsize}rem;
  }

  &:focus {
    outline: 0;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ButtonLoader = styled(Loader)`
  width: 1.2rem;
  height: 1.2rem;
  margin: auto;
  /* maybe it should be extracted to colors or not??? */
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-left-color: ${colors.bluePrimary};

  ::after {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  background-color: ${colors.bluePrimary};
  color: ${colors.white};

  &:hover {
    background-color: ${colors.bluePrimaryHover};
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  background-color: ${colors.black};
  color: ${colors.bluePrimary};
  border: 1px solid ${colors.grayPrimary};

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
`;

export const SocialSignInButton = styled(ButtonBase)`
  background-color: ${colors.white};
  color: ${colors.grayDark};

  &:hover {
    background-color: ${colors.grayLight};
  }
`;

export const JumboButton = styled(ButtonBase)`
  /* width: 30rem;
  height: 3.7rem; */
  color: ${colors.black};
  background-color: ${colors.graySecondary};
  font-size: medium;
  font-weight: 700;

  &:hover {
    filter: brightness(1.4);
  }
`;
