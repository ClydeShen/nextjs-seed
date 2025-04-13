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

export interface DynamicFormCardSectionProps extends Block {
  parent?: string;
}
const FormCardSection = (props: DynamicFormCardSectionProps) => {
  const { title, description, type, rows, columns, parent } = props;
  return (
    <FormCardSectionLayout title={title} description={description}>
      {rows?.map((row, i) => {
        return (
          <Fragment key={`${row.label}-${i}`}>
            <FormCardSectionRow {...row} parent={parent} />
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
export const DynamicFormCardSection = (props: DynamicFormCardSectionProps) => {
  const { type } = props;
  switch (type) {
    case BlockType.PRODUCT:
      return <FormCardProductSection {...props} />;
    case BlockType.MDX:
      return <FormCardMarkdownSection {...props} />;
    default:
      return <FormCardSection {...props} />;
  }
};
