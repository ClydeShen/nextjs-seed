import { Stack, Typography } from '@mui/material';
import { BlockType } from '@utils/constants';
import { Block } from 'form';
import { Fragment } from 'react';
import { FormCardMarkdownSection } from './FormCardMarkdownSection';
import { FormCardProductSection } from './FormCardProductSection';
import { FormCardSectionRow } from './FormCardSectionRow';
interface FormCardSectionLayoutProps {
  children?: React.ReactNode;
  description?: React.ReactNode;
  title?: string;
}

export interface DynamicFormCardSectionProps {
  block: Block;
}

const FormCardSection = (block: Block) => {
  const { title, description, type, rows, columns } = block;
  return (
    <FormCardSectionLayout title={title} description={description}>
      {rows?.map((row, i) => {
        return (
          <Fragment key={`${row.label}-${i}`}>
            <FormCardSectionRow {...row} />
          </Fragment>
        );
      })}
    </FormCardSectionLayout>
  );
};

const FormCardSectionLayout = (props: FormCardSectionLayoutProps) => {
  const { children, title, description } = props;
  return (
    <Stack spacing={2}>
      {(title || description) && (
        <Stack>
          {title && <Typography variant='h4'>{title}</Typography>}
          {description && <Typography>{description}</Typography>}
        </Stack>
      )}
      <Stack spacing={2}>{children}</Stack>
    </Stack>
  );
};

export const DynamicFormCardSection = (block: Block) => {
  const { type } = block;
  switch (type) {
    case BlockType.PRODUCT:
      return <FormCardProductSection {...block} />;
    case BlockType.MDX:
      return <FormCardMarkdownSection {...block} />;
    default:
      return <FormCardSection {...block} />;
  }
};
