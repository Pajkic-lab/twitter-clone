import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import { Colors } from './styles'
import { Loader } from './Loader'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  image?: string
  $wide?: boolean
  $align?: 'left' | 'center' | 'right'
}

const ButtonComponent = forwardRef<HTMLButtonElement, Props>(
  ({ loading, disabled, children, image, ...props }, ref) => (
    <button ref={ref} data-element="button" disabled={disabled || loading} {...props}>
      {loading ? (
        <ButtonLoader />
      ) : image ? (
        <>
          <img src={image} /> {children}
        </>
      ) : (
        children
      )}
    </button>
  ),
)

export const ButtonBase = styled(ButtonComponent)`
  padding: 0 1rem;
  height: 40px;
  width: ${props => (props.$wide && 300) || 156}px;
  display: inline-flex;
  align-items: center;
  justify-content: ${props => props.$align || 'center'};
  transition: all 0.3s;
  border-radius: 5rem;
  font-size: 1rem;
  line-height: 1.1;
  cursor: pointer;

  img {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
  }

  &[disabled] {
    pointer-events: none;
    background-color: ${Colors.secondaryActive};
    color: ${Colors.textGray};
    border: 0;
  }

  &:focus {
    outline: 0;
  }
`

const ButtonLoader = styled(Loader)`
  width: 1.2rem;
  height: 1.2rem;
  margin: auto;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-left-color: ${Colors.primary};

  ::after {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
`

export const PrimaryButton = styled(ButtonBase)`
  background-color: ${Colors.primary};
  color: ${Colors.white};
  font-weight: 600;

  &:hover {
    background-color: ${Colors.primaryHover};
  }
`

export const SecondaryButton = styled(ButtonBase)`
  background-color: ${Colors.black};
  color: ${Colors.primary};
  font-weight: 600;
  border: 1px solid ${Colors.darkGray};

  &:hover {
    background-color: ${Colors.primary};
    color: ${Colors.white};
    border: 1px solid ${Colors.primary};
  }
`

export const SocialSignInButton = styled(ButtonBase)`
  background-color: ${Colors.white};
  color: ${Colors.darkerGrey};
  font-weight: 600;

  &:hover {
    background-color: ${Colors.lighterGray};
  }
`

export const JumboButton = styled(ButtonBase)`
  width: 30rem;
  height: 3.7rem;
  color: ${Colors.black};
  background-color: ${Colors.darkGray};
  font-size: medium;
  font-weight: 700;

  &:hover {
    filter: brightness(1.4);
  }
`
