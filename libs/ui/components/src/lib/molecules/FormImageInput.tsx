import { FieldValues, useController, useFormState } from 'react-hook-form';
import { ImageInput } from '../atoms/ImageInput';
import { InputProps } from '../atoms/Input';
import { MakeFormComponentProps } from './make-form-component-props.type';

export type FormImageInputProps<T extends FieldValues = FieldValues> = MakeFormComponentProps<
  InputProps,
  T
>;

export function FormImageInput<T extends FieldValues = FieldValues>(props: FormImageInputProps<T>) {
  const { control, name, required, disabled, ...rest } = props;
  const formState = useFormState({ control, name, disabled });

  const {
    field: { value, ...field },
  } = useController({
    name,
    control,
  });

  return (
    <ImageInput
      {...rest}
      required={props.required}
      {...control.register(name, { required, disabled })}
      error={formState.errors[name]?.message?.toString()}
      disabled={disabled || formState.isSubmitting}
      isDirty={formState.isDirty}
      onChange={(value) => field.onChange(value)}
    />
  );
}
