import React, {
  forwardRef,
  FunctionComponent,
  HTMLProps,
  useState,
} from 'react'
import styled from 'styled-components'
import { Colors } from './styles/styles'
import classNames from 'classnames'
import { v4 as uuid } from 'uuid'

interface Props {
  label?: string
  active?: boolean
  prefix?: string
  suffix?: string
  placeholder: string
}

const InputComponent = forwardRef<HTMLInputElement, Props>(
  ({ label, active, prefix, suffix, placeholder, ...props }, ref) => {
    return <input placeholder={placeholder} ref={ref} {...props} />
  },
)

export const BaseInput = styled(InputComponent)`
  padding-left: 10px;
  width: 30rem;
  height: 4.3rem;
  background-color: ${Colors.black};
  outline: none;
  border: 2px solid ${Colors.darkerGrey};
  border-radius: 4px;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid ${Colors.primary};

    &::placeholder {
      color: ${Colors.primary};
      transform: translateY(-70%);
      transition: transform 0.2s;
      font-size: 1rem;
    }
  }
`
