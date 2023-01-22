import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { Colors } from './styles'

interface Props {
  name: string
  value?: string
  error?: string
  type: string
  id: string
  touched?: boolean
  handleChange: { (e: React.ChangeEvent<any>): void }
  onBlure: { (e: React.FocusEvent<any, Element>): void }
}

export const BaseInput = forwardRef<HTMLInputElement, Props>(
  (
    { name, value, error, type, id, touched, handleChange, onBlure, ...props },
    ref,
  ) => {
    return (
      <Wrapper>
        <Input
          id={id}
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={onBlure}
          touched={touched}
          error={error}
          {...props}
        />
        <Label htmlFor={id} touched={touched} error={error} value={value}>
          {name}
        </Label>
        {error && touched && <ErrorMessage>{error}</ErrorMessage>}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  position: relative;
`

const Input = styled.input<{
  error?: string
  touched?: boolean
  value?: string
}>`
  margin: 0 0 25px 0;
  padding-left: 10px;
  width: 30rem;
  height: 4rem;
  background-color: ${Colors.black};
  outline: none;
  border: 2px solid ${Colors.darkerGrey};
  border-radius: 4px;
  font-size: 1.2rem;
  color: ${Colors.white};
  cursor: pointer;

  &:focus {
    border: 2px solid ${Colors.primary};
  }

  ${props =>
    props.error &&
    props.touched &&
    `
    border: 2px solid ${Colors.red};
    margin-bottom: 0px;
  `}
`

const Label = styled.label<{
  error?: string
  touched?: boolean
  value?: string
}>`
  position: absolute;
  top: 1rem;
  left: 10px;
  padding: 0 7px;
  border-radius: 4px;
  color: ${Colors.darkerGrey};
  font-size: large;
  transition: 0.1s;
  transition: transform 0.1s;
  background-color: ${Colors.black};
  cursor: pointer;

  ${Input}:focus ~ & {
    color: ${Colors.primary};
    transform: translateY(-2rem);
  }

  ${props =>
    props.value &&
    `
    transform: translateY(-2rem);
  `}

  ${props =>
    props.error &&
    props.touched &&
    `
    color: ${Colors.red};
    transform: translateY(-2rem);
  `}
`

const ErrorMessage = styled.h4`
  margin: 5px 0 15px 0;
  padding-left: 18px;
  color: ${Colors.red};
`
