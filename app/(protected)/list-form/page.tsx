'use client';
import { FormCard } from '@components/FormLayout/FormCard';
import { FormCardSection } from '@components/FormLayout/FormCardSection';
import { Page, PageHeader } from '@components/Page';
import formConfigJson from '@config/form.config.json';
import { Stack } from '@mui/material';
import { Fragment, useMemo } from 'react';
export interface ListFormProps {}
const ListForm = (props: ListFormProps) => {
  const sections = useMemo(() => {
    return formConfigJson.layout.sections.map((section) => {
      return (
        <Fragment key={section.id}>
          <FormCard id={section.id} title={section.title}>
            {section.children.map((block, i) => {
              return (
                <Fragment key={`${section.id}-${i}`}>
                  <FormCardSection block={block}></FormCardSection>
                </Fragment>
              );
            })}
          </FormCard>
        </Fragment>
      );
    });
  }, []);
  return (
    <Page maxWidth='lg'>
      <PageHeader />
      <Stack gap={4}>{sections}</Stack>
    </Page>
  );
};
export default ListForm;
