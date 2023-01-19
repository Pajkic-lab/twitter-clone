import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { Colors } from './styles'

interface Props {
  designation?: string
}

export const FloatingInput = forwardRef<HTMLInputElement, Props>(
  ({ designation, ...props }, ref) => {
    const [stateClass, setStateClass] = useState(false)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value ? setStateClass(true) : setStateClass(false)
    }

    // this func is supose to select input on label click
    const focusInput = () => {
      console.log(ref)
    }

    return (
      <Wrapper>
        <Input {...props} ref={ref} onChange={e => handleOnChange(e)} />
        <Label stateClass={stateClass} onClick={() => focusInput()}>
          {designation}
        </Label>
        {/* error message */}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  padding-left: 10px;
  width: 30rem;
  height: 4.3rem;
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
`

const Label = styled.label<{ stateClass?: boolean }>`
  position: absolute;
  top: 1.3rem;
  left: 10px;
  padding: 0 7px;
  border-radius: 4px;
  color: ${Colors.darkerGrey};
  font-size: large;
  transition: 0.1s;
  transition: transform 0.3s;
  background-color: ${Colors.black};
  cursor: pointer;

  ${Input}:focus ~ & {
    color: ${Colors.primary};
    transform: translateY(-2rem);
  }

  ${props =>
    props.stateClass &&
    `
    color: ${Colors.primary};
    transform: translateY(-2rem);
  `}
`
