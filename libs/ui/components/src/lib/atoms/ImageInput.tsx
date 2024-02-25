import { Camera, Colors } from '@tw/ui/assets';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import styled from 'styled-components';

interface Props {
  name: string;
  type: string;
  id: string;
  setImageData: React.Dispatch<React.SetStateAction<string>>;
}

const maxWidth = 400;
const maxHeight = 400;
const format = 'PNG' || 'JPEG';
const quality = 100;
const rotation = 0;
const outputType = 'base64';
const minWidth = 400;
const minHeight = 400;
const maxFileSizeKB = 800;

// Research size of image and quality and it should be abel to set image metadata thru props...
// props should be something like Avatar, Cover, Post... which will predefine size of image.

// Research, should I create FormImageInput as integration to react hook form...

export const ImageInput = forwardRef<HTMLInputElement, Props>(
  ({ name, type, id, setImageData, ...props }, refernece) => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      if (inputRef.current !== null) {
        inputRef.current.click();
      }
    };

    const resizeImage = useCallback(
      async (file: Blob) => {
        try {
          Resizer.imageFileResizer(
            file,
            maxWidth,
            maxHeight,
            format,
            quality,
            rotation,
            (uri) => {
              setImageData(uri as string);
              setErrorMessage('');
            },
            outputType,
            minWidth,
            minHeight
          );
        } catch (error: any) {
          setErrorMessage(error.message as string);
        }
      },
      [setImageData, setErrorMessage]
    );

    const handleFileChange = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
          setErrorMessage('File does not exist.');
          // alert to be removed when there is proper error handling.
          alert('File does not exist.');
          return;
        }

        if (!file.type.startsWith('image/')) {
          setErrorMessage('File is not an image.');
          alert('File is not an image.');
          return;
        }

        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > maxFileSizeKB) {
          setErrorMessage('File size exceeds 800KB.');
          alert('File size exceeds 800KB.');
          return;
        }

        resizeImage(file);
      },
      [resizeImage]
    );

    return (
      <SVGWrapper onClick={handleClick}>
        <ImageSVG />
        <Input
          id={id}
          ref={inputRef}
          type={type}
          accept="image/*"
          onChange={handleFileChange}
          {...props}
        />
      </SVGWrapper>
    );
  }
);

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.grayDarkActive};
  }
`;

const ImageSVG = styled(Camera)`
  fill: ${Colors.grayPrimary};
  width: 1.5rem;
  height: 1.5rem;
`;

const Input = styled.input`
  display: none;
  visibility: hidden;
`;
