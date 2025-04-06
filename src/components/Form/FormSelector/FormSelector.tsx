import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { LabelValue } from 'global';
import { useId } from 'react';
import { get, useController, useFormContext } from 'react-hook-form';

export type FormTextfieldProps = TextFieldProps & {
  errorMessage?: string;
  name: string;
  options: readonly LabelValue[];
  inline?: boolean;
};

export const FormSelector = (props: FormTextfieldProps) => {
  const {
    id,
    name,
    errorMessage,
    disabled,
    defaultValue = '',
    options,
    inline = false,
    ...textFieldProps
  } = props;
  const autoId = useId();
  const _id = id || autoId;
  const { control } = useFormContext();
  const {
    field,
    formState: { errors },
  } = useController({ name, control, shouldUnregister: true });
  const { ref, ...fieldProps } = field;
  const error = get(errors, name);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
  };
  return (
    <TextField
      {...fieldProps}
      {...textFieldProps}
      sx={{
        ...(inline && {
          '& .MuiInputBase-root': {
            '& .MuiInputBase-input': {
              px: 1,
              py: 0.2,
            },
          },
        }),
      }}
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
