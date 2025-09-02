import { FieldValues, useFormState } from 'react-hook-form';
import { InputComponent, InputProps } from '../atoms/Input';
import { MakeFormComponentProps } from './make-form-component-props.type';

export type FormInputProps<T extends FieldValues = FieldValues> = MakeFormComponentProps<
  InputProps,
  T
>;

export function FormInput<T extends FieldValues = FieldValues>(props: FormInputProps<T>) {
  const { control, name, required, disabled, ...rest } = props;
  const formState = useFormState({ control, name, disabled });

  return (
    <InputComponent
      {...rest}
      required={props.required}
      {...control.register(name, { required, disabled })}
      error={formState.errors[name]?.message?.toString()}
      disabled={disabled || formState.isSubmitting}
      isDirty={formState.isDirty}
    />
  );
}
