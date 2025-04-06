import { Stack } from '@mui/material';
import { Block } from 'form';
import { Fragment } from 'react';
import { FormCardMarkdownSectionRow } from './FormCardMarkdownSectionRow';

export const FormCardMarkdownSection = (block: Block) => {
  const { title, description, rows } = block;
  return (
    <Stack>
      {rows?.map((row, i) => {
        return (
          <Fragment key={`${row.label}-${i}`}>
            <FormCardMarkdownSectionRow {...row} />
          </Fragment>
        );
      })}
    </Stack>
  );
};
