'use client';
import { FormCard } from '@components/FormLayout/FormCard';
import { DynamicFormCardSection } from '@components/FormLayout/FormCardSection';
import { FormHeader } from '@components/FormLayout/FormHeader';
import { FormNav } from '@components/FormLayout/FormNav';
import { Page, PageHeader } from '@components/Page';
import formConfigJson from '@config/form.config';
import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import { Stack } from '@mui/material';
import { Fragment, useEffect, useMemo } from 'react';
export interface ListFormProps {}
const ListForm = (props: ListFormProps) => {
  const { bindFormNav } = useFormLayout();

  useEffect(() => {
    const sectionId = formConfigJson.layout.sections.map((section) => {
      return { label: section.title, value: section.id };
    });
    bindFormNav?.(sectionId, true);
  }, []);
  const sections = useMemo(() => {
    return formConfigJson.layout.sections.map((section) => {
      return (
        <Fragment key={section.id}>
          <FormCard
            id={section.id}
            title={section.title}
            actions={section.actions}
          >
            {section.children.map((block, i) => {
              return (
                <Fragment key={`${section.id}-${i}`}>
                  <DynamicFormCardSection {...block} />
                </Fragment>
              );
            })}
          </FormCard>
        </Fragment>
      );
    });
  }, []);
  return (
    <>
      <FormHeader title='List form example' />
      <Page maxWidth='lg' sx={{ pb: 20 }}>
        <PageHeader />
        <Stack id='form-container' direction={'row'} spacing={2} flexGrow={1}>
          <Stack id='form-content' gap={4} flexGrow={1}>
            {sections}
          </Stack>
          <FormNav />
        </Stack>
      </Page>
    </>
  );
};
export default ListForm;
