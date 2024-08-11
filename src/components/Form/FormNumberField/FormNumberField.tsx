import { TextField, TextFieldProps } from '@mui/material';
import { useId } from 'react';
import { get, useController, useFormContext } from 'react-hook-form';
import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from 'react-number-format';

export type FormTextfieldProps = TextFieldProps & {
  errorMessage?: string;
  name: string;
};

export const FormNumberField = (
  props: FormTextfieldProps & NumericFormatProps
) => {
  const {
    id,
    name,
    errorMessage,
    disabled,
    defaultValue = '',
    thousandSeparator = ',',

    allowNegative = true,
    decimalScale = 0,
    decimalSeparator = '.',
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    allowLeadingZeros = false,

    ...textFieldProps
  } = props;
  const autoId = useId();
  const _id = id || autoId;
  const { control } = useFormContext();
  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const { ref, onChange, ...fieldProps } = field;
  const error = get(errors, name);
  const onValueChange = (values: NumberFormatValues) => {
    onChange(values.floatValue);
  };
  return (
    <NumericFormat
      {...fieldProps}
      {...textFieldProps}
      customInput={TextField}
      getInputRef={ref}
      type='tel'
      id={_id}
      onValueChange={onValueChange}
      inputProps={{
        inputMode: 'decimal',
      }}
      error={!!error?.message || !!errorMessage}
      helperText={error?.message || errorMessage}
      disabled={disabled}
      decimalScale={decimalScale}
      thousandSeparator={thousandSeparator}
      allowNegative={allowNegative}
      decimalSeparator={decimalSeparator}
      allowLeadingZeros={allowLeadingZeros}
    />
  );
};
