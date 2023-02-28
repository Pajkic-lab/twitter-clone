import { ReactComponent as Image } from 'assets/svg/image.svg'
import React, { forwardRef, useRef } from 'react'
import styled from 'styled-components'
import { Colors } from './styles'

interface Props {
  name: string
  type: string
  id: string
  setImageData: React.Dispatch<React.SetStateAction<string>>
}

export const ImageInput = forwardRef<HTMLInputElement, Props>(
  ({ name, type, id, setImageData, ...props }, refernece) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClick = () => {
      if (inputRef.current !== null) {
        inputRef.current.click()
      }
    }

    return (
      <SVGWrapper onClick={handleClick}>
        <ImageSVG />
        <Input
          id={id}
          ref={inputRef}
          type={type}
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
              const file = event.target.files[0]
              const reader = new FileReader()

              reader.readAsDataURL(file)
              reader.onload = function () {
                if (reader.result) {
                  setImageData(reader.result as string)
                }
              }
            }
          }}
          {...props}
        />
      </SVGWrapper>
    )
  },
)

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blackActive};
  }
`

const ImageSVG = styled(Image)`
  fill: ${Colors.textGray};
  width: 1.5rem;
  height: 1.5rem;
`

const Input = styled.input`
  display: none;
  visibility: hidden;
`
