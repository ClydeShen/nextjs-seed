import { Dayjs } from '@libs/dayjs';
import { TextFieldProps, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useId } from 'react';
import { get, useController, useFormContext } from 'react-hook-form';

export type FormTextfieldProps = TextFieldProps & {
  errorMessage?: string;
  name: string;
};

export const FormDatepicker = (props: FormTextfieldProps) => {
  const {
    id,
    name,
    errorMessage,
    disabled,
    defaultValue = '',
    ...textFieldProps
  } = props;
  const autoId = useId();
  const theme = useTheme();
  const _id = id || autoId;
  const { control } = useFormContext();
  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const { ref, value, ...fieldProps } = field;
  const error = get(errors, name);
  const onChange = (value: Dayjs | null) => {
    field.onChange(value);
  };
  return (
    <DatePicker
      {...fieldProps}
      ref={ref}
      value={value}
      onChange={onChange}
      desktopModeMediaQuery={theme.breakpoints.up('sm')}
      disabled={disabled}
      slotProps={{
        textField: {
          ...textFieldProps,
          id: _id,
          error: !!error?.message || !!errorMessage,
          helperText: error?.message || errorMessage,
        },
      }}
    />
  );
};
