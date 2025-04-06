'use client';
import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  Typography,
} from '@mui/material';
import { LabelValue } from 'global';
import { get } from 'lodash';
import { useId } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';

export type FormRadioGroupProps<T extends FieldValues> = RadioGroupProps &
  UseControllerProps<T> & {
    options: readonly LabelValue[];
    inline?: boolean;
  };

export const FormRadioGroup = <T extends FieldValues>(
  props: FormRadioGroupProps<T>
) => {
  const { id, name, disabled, defaultValue = '', options, inline } = props;
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
    <Stack>
      <Stack direction='row' spacing={2} width='100%'>
        <RadioGroup {...fieldProps} ref={ref} id={_id} onChange={onChange} row>
          {options?.map((option: LabelValue) => (
            <FormControlLabel
              key={option.label}
              checked={
                // in case of using 'null' as the key of an enum (which is valid in typescript) that is coverted to an option of radio button group, this will take effect
                field.value === null && option.value === 'null'
                  ? true
                  : field.value?.toString() === option.value
              }
              value={option.value}
              control={<Radio color={'default'} />}
              label={
                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '-0.16px',
                    textTransform: 'lowercase',
                    '&::first-letter': {
                      textTransform: 'capitalize',
                    },
                  }}
                >
                  {option.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </Stack>
      {error?.message && (
        <FormHelperText error sx={{ ml: 1.5 }}>
          {error?.message as string}
        </FormHelperText>
      )}
    </Stack>
  );
};
