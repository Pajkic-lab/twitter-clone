import { CameraIcon, colors } from '@tw/ui/assets';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import styled from 'styled-components';

interface Props {
  name: string;
  type: string;
  id: string;
  onChange: (imageData: string) => void;
  error?: string;
  disabled?: boolean;
  isDirty?: boolean;
}

// following stats should be set according to necessity
const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;
const IMAGE_FORMAT = 'JPEG' || 'PNG';
const QUALITY = 100;
const ROTATION = 0;
const OUTPUT_TYPE = 'base64';
const MIN_WIDTH = 400;
const MIN_HEIGHT = 400;
const MAX_FILE_SIZE_KB = 800;

export const ImageInput = forwardRef<HTMLInputElement, Props>(
  ({ name, type, id, onChange, disabled, ...rest }, refernece) => {
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
            MAX_WIDTH,
            MAX_HEIGHT,
            IMAGE_FORMAT,
            QUALITY,
            ROTATION,
            (uri) => {
              onChange(uri as string);
              setErrorMessage('');
            },
            OUTPUT_TYPE,
            MIN_WIDTH,
            MIN_HEIGHT
          );
        } catch (error: any) {
          setErrorMessage(error.message as string);
        }
      },
      [setErrorMessage, onChange]
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
        if (fileSizeKB > MAX_FILE_SIZE_KB) {
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
          name={name}
          ref={inputRef}
          type={type}
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
          {...rest}
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
    background-color: ${colors.grayDarkActive};
  }
`;

const ImageSVG = styled(CameraIcon)`
  fill: ${colors.grayPrimary};
  width: 1.5rem;
  height: 1.5rem;
`;

const Input = styled.input`
  display: none;
  visibility: hidden;
`;
