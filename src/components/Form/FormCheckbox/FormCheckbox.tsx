import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextFieldProps,
} from '@mui/material';
import { useId } from 'react';
import { get, useController, useFormContext } from 'react-hook-form';

export type FormTextfieldProps = TextFieldProps & {
  errorMessage?: string;
  name: string;
};

export const FormCheckbox = (props: FormTextfieldProps) => {
  const {
    id,
    name,
    errorMessage,
    disabled,
    defaultValue = '',
    required,
    label,
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
    field.onChange(e.target.checked);
  };
  return (
    <FormControl required={required} component='fieldset' variant='standard'>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              {...fieldProps}
              checked={fieldProps.value}
              onChange={onChange}
            />
          }
          label={label}
        />
      </FormGroup>
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
};
