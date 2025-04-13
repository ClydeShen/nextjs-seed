'use client';

import { FormDynamicInput } from '@components/Form/FormDynamicInput';
import { FormLabel, Stack, Typography } from '@mui/material';
import { when } from '@utils/helper';
import type { Row } from 'form';
import { Fragment, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export interface FormCardSectionRowLayoutProps extends Row {
  children?: React.ReactNode;
  parent?: string;
}

export const FormCardSectionRow = (props: FormCardSectionRowLayoutProps) => {
  const { label, description, required, fields, hide, parent } = props;
  const { watch } = useFormContext();
  const shouldBe = when(watch);
  const formInputs = useMemo(() => {
    return fields?.map((field, i) => {
      return (
        <Fragment key={`${field.fieldRef}-${i}`}>
          <FormDynamicInput field={field} parent={parent} />
        </Fragment>
      );
    });
  }, [fields]);
  if (hide && shouldBe(hide)) return null;
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
                content: required ? '"*"' : '""',
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
