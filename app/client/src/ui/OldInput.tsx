import React, {
  forwardRef,
  FunctionComponent,
  HTMLProps,
  useState,
} from 'react'
import styled from 'styled-components'
import { Colors } from './styles'

interface Props {
  label?: string
  active?: boolean
  prefix?: string
  suffix?: string
  placeholder?: string
  designation?: string
}

const InputComponent = forwardRef<HTMLInputElement, Props>(
  (
    { label, active, prefix, suffix, placeholder, designation, ...props },
    ref,
  ) => {
    const [fieldActive, setFieldActive] = useState(false)

    const onFocusHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldActive(true)
      // onFocus(e)
      console.log(fieldActive)
    }

    const stateClass = fieldActive || active ? 'state--active' : ''

    return (
      <InputWrapper>
        <label className={stateClass}>{designation}</label>
        <input
          placeholder={placeholder}
          ref={ref}
          {...props}
          onFocus={onFocusHandle}
        />
      </InputWrapper>
    )
  },
)

const InputWrapper = styled.div`
  position: relative;

  label {
    position: absolute;
    top: 1.2rem;
    left: 10px;
    color: 'pink' !important;
    font-size: large;
  }

  &.state--active {
    color: ${Colors.primary};
  }
`

// const In = styled.input`
//   &:focus {
//     border: 2px solid ${Colors.primary};
//   }
// `

// const Label = styled.label`
//   position: absolute;
//   top: 1.2rem;
//   left: 10px;
//   color: ${Colors.darkerGrey};
//   font-size: large;
// `

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
  }
`
