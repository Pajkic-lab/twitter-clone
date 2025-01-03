import { colors } from '@tw/ui/assets';
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';

export type InputProps = {
  id: string;
  name: string;
  type: string;
  width?: number;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  touched?: boolean;
  isDirty?: boolean;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref'
>;

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, width, error, disabled, required, type, isDirty, ...rest },
    ref
  ) => {
    return (
      <Wrapper>
        <Input
          ref={ref}
          id={id}
          name={name}
          error={error}
          required={required}
          type={type}
          disabled={disabled}
          width={width}
          {...rest}
        />
        <Label htmlFor={id} error={error} isDirty={isDirty}>
          {name}
        </Label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
`;

const Input = styled.input<{
  error?: string;
  width?: number;
}>`
  margin: 0 0 25px 0;
  padding-left: 10px;
  width: 100%;
  height: 4rem;
  background-color: ${colors.black};
  outline: none;
  border: 1px solid ${colors.grayDark};
  border-radius: 4px;
  font-size: 1.2rem;
  color: ${colors.white};
  cursor: pointer;

  width: ${({ width }) => width}rem;

  border: 1px solid
    ${({ error }) => (error ? colors.red : colors.graySecondary)};

  &:focus {
    border: 1px solid ${colors.bluePrimary};
  }
`;

const Label = styled.label<{
  error?: string;
  isDirty?: boolean;
}>`
  position: absolute;
  top: 1rem;
  left: 10px;
  padding: 0 7px;
  border-radius: 4px;
  color: ${colors.graySecondary};
  font-size: large;
  transition: 0.1s;
  transition: transform 0.1s;
  background-color: ${colors.black};
  cursor: pointer;

  ${Input}:focus ~ & {
    color: ${colors.bluePrimary};
    transform: translateY(-2rem);
  }

  color: ${({ error }) => (error ? colors.red : colors.graySecondary)};

  transform: ${({ error, isDirty }) =>
    error || isDirty ? 'translateY(-2rem)' : 'none'};
`;

const ErrorMessage = styled.h4`
  position: absolute;
  bottom: -1.2rem;
  padding-left: 10px;
  color: ${colors.red};
`;
