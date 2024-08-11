import { TextField, TextFieldProps } from '@mui/material';
import { useId } from 'react';
import { get, useController, useFormContext } from 'react-hook-form';

export type FormTextfieldProps = TextFieldProps & {
  errorMessage?: string;
  name: string;
};

export const FormTextField = (props: FormTextfieldProps) => {
  const {
    id,
    name,
    errorMessage,
    disabled,
    defaultValue = '',
    ...textFieldProps
  } = props;
  const autoId = useId();
  const _id = id || autoId;
  const { control } = useFormContext();
  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const { ref, ...fieldProps } = field;
  const error = get(errors, name);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
  };
  return (
    <TextField
      {...fieldProps}
      {...textFieldProps}
      ref={ref}
      id={_id}
      onChange={onChange}
      error={!!error?.message || !!errorMessage}
      helperText={error?.message || errorMessage}
      disabled={disabled}
    />
  );
};
