import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { LabelValue } from '@utils/types';
import { useId } from 'react';
import { get, useController, useFormContext } from 'react-hook-form';

export type FormTextfieldProps = TextFieldProps & {
  errorMessage?: string;
  name: string;
  options: LabelValue[];
};

export const FormSelector = (props: FormTextfieldProps) => {
  const {
    id,
    name,
    errorMessage,
    disabled,
    defaultValue = '',
    options,
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
      select
    >
      <MenuItem value={''} disabled>
        Select
      </MenuItem>
      {options.map((option, i) => {
        return (
          <MenuItem key={`${i}-${option.value}`} value={option.value}>
            {option.label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
