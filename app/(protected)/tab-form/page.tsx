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
const layoutSections = formConfigJson.layout.sections.map((section) => {
  return { label: section.title, value: section.id };
});
const TabForm = (props: TabFormProps) => {
  const { bindFormNav, onSelectSection } = useFormLayout();
  useEffect(() => {
    bindFormNav?.(layoutSections, true);
    onSelectSection?.(layoutSections?.[0]?.value);
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
          <FormTabs sections={formConfigJson.layout.sections} />
        </Stack>
      </Page>
    </>
  );
};
export default TabForm;
