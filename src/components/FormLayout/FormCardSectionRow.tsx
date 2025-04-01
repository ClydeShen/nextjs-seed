import { FormDynamicInput } from '@components/Form/FormDynamicInput';
import { FormLabel, Stack, Typography } from '@mui/material';
import type { FieldInput } from 'form';
import { Fragment, useMemo } from 'react';

export interface FormCardSectionRowProps {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  requried?: boolean;
  fields: FieldInput[];
}
export const FormCardSectionRow = (props: FormCardSectionRowProps) => {
  const { children, label, description, requried, fields } = props;
  const formInputs = useMemo(() => {
    return fields?.map((field, i) => {
      return (
        <Fragment key={`${field.fieldRef}-${i}`}>
          <FormDynamicInput field={field} />
        </Fragment>
      );
    });
  }, []);
  return (
    <Stack
      id={label}
      justifyContent='space-between'
      spacing={{
        xs: 1,
        md: 2,
      }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
    >
      <Stack
        sx={{
          width: {
            xs: '100%',
            md: 'clamp(160px, 40%, 400px)',
          },
        }}
      >
        {label && (
          <FormLabel
            htmlFor={label}
            component={Typography}
            gutterBottom={false}
            sx={{
              width: {
                xs: '100%',
                md: 'clamp(100px, 100%, 380px)',
              },
              '&::after': {
                content: requried ? '"*"' : '""',
                color: 'error.main',
              },
            }}
          >
            {label}
          </FormLabel>
        )}
        {description && (
          <Typography
            variant='body2'
            whiteSpace='break-spaces'
            sx={{
              width: {
                xs: '100%',
                md: 'clamp(180px, 100%, 250px)',
              },
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>
      <Stack
        flexGrow={1}
        gap={2}
        sx={{
          width: {
            xs: '100%',
            md: 'clamp(10px, 60%, 500px)',
          },
        }}
      >
        {formInputs}
      </Stack>
    </Stack>
  );
};
