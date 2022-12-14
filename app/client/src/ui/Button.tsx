import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { Colors } from './styles/styles'
import styled from 'styled-components'
import { Loader } from './Loader'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // setModalIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  loading?: boolean
  align?: 'left' | 'center' | 'right'
  wide?: boolean
}

const ButtonComponent = forwardRef<HTMLButtonElement, Props>(
  ({ /*setModalIsOpen,*/ loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      data-element="button"
      disabled={disabled || loading}
      {...props}
      // onClick={() => setModalIsOpen(true)}
    >
      {loading ? <ButtonLoader /> : children}
    </button>
  ),
)

export const ButtonBase = styled(ButtonComponent)`
  padding: 0 1rem;
  height: 40px;
  min-width: ${props => (props.wide && 276) || 130}px;
  display: inline-flex;
  align-items: center;
  justify-content: ${props => props.align || 'center'};
  transition: all 0.3s;
  border: 0;
  border-radius: 2px;
  font-family: 'DM Sans', 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.1;
  cursor: pointer;

  i {
    margin-right: 1rem;
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
  width: 1rem;
  height: 1rem;
  margin: auto;
  border: 4px solid rgba(255, 255, 255, 0.6);
  border-left-color: ${Colors.darkBlue};

  ::after {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
`

export const PrimaryButtonV1 = styled(ButtonBase)`
  background-color: ${Colors.primary};
  color: ${Colors.white};

  &:hover {
    background-color: ${Colors.primaryHover};
  }

  &:focus {
    background-color: ${Colors.primaryActive};
  }
`

export const PrimaryButton = styled(ButtonBase)`
  background-color: ${Colors.primary};
  color: ${Colors.white};

  &:hover {
    background-color: ${Colors.primaryHover};
  }

  &:focus {
    background-color: ${Colors.primaryActive};
  }
`
