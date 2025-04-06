'use client';
import { FormCard } from '@components/FormLayout/FormCard';
import { DynamicFormCardSection } from '@components/FormLayout/FormCardSection';
import { FormHeader } from '@components/FormLayout/FormHeader';
import { FormTabs } from '@components/FormLayout/FormTabs';
import { Page, PageHeader } from '@components/Page';
import formConfigJson from '@config/form.config';
import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import { Stack } from '@mui/material';
import { Fragment, useEffect, useMemo } from 'react';

export interface TabFormProps {}
const TabForm = (props: TabFormProps) => {
  const { bindFormNav, onSelectSection } = useFormLayout();
  useEffect(() => {
    const sectionId = formConfigJson.layout.sections.map((section) => {
      return { label: section.title, value: section.id };
    });
    bindFormNav?.(sectionId, true);
    onSelectSection?.(sectionId[0].value);
  }, []);
  const sections = useMemo(() => {
    return formConfigJson.layout.sections.map((section) => {
      return (
        <Fragment key={section.id}>
          <FormCard id={section.id} title={section.title} tab>
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
      <FormHeader title='Tab form example' />

      <Page maxWidth='lg' sx={{ pb: 20 }}>
        <PageHeader />
        <Stack spacing={4}>
          <FormTabs />
          <Stack id='form-container' direction={'row'} spacing={2} flexGrow={1}>
            {sections}
          </Stack>
        </Stack>
      </Page>
    </>
  );
};
export default TabForm;
