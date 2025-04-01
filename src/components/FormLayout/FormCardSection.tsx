import { Stack, SxProps, Typography } from '@mui/material';
import { Block } from 'form';
import { Fragment, useMemo } from 'react';
import { FormCardSectionRow } from './FormCardSectionRow';

export interface FormCardSectionProps {
  children?: React.ReactNode;
  summary?: React.ReactNode;
  title?: string;
  sx?: SxProps;
  block: Block;
}
export const FormCardSection = (props: FormCardSectionProps) => {
  const { block } = props;
  const { title, description, type, rows, columns, template } = block;

  const formRows = useMemo(() => {
    return rows?.map((row, i) => {
      return (
        <Fragment key={`${row.label}-${i}`}>
          <FormCardSectionRow
            label={row.label}
            requried={row.required}
            description={row.description}
            fields={row.fields}
          />
        </Fragment>
      );
    });
  }, []);
  return (
    <Stack spacing={2}>
      {(title || description) && (
        <Stack>
          {title && <Typography variant='h4'>{title}</Typography>}
          {description && <Typography>{description}</Typography>}
        </Stack>
      )}
      <Stack spacing={2}>{formRows}</Stack>
    </Stack>
  );
};
