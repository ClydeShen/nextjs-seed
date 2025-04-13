'use client';
import { FormHeader } from '@components/FormLayout/FormHeader';
import { FormNav } from '@components/FormLayout/FormNav';
import {
  FormProductCard,
  Product,
} from '@components/FormLayout/FormProductCard';
import { FormTabs } from '@components/FormLayout/FormTabs';
import { Page, PageHeader } from '@components/Page';
import formConfigJson from '@config/form.config';
import { useProduct } from '@hooks/useForm/useProduct';
import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import { Button, Stack } from '@mui/material';
import { Fragment, useEffect, useMemo } from 'react';

export interface TabFormProps {}
const tabs = formConfigJson.product.sections.map((section) => {
  return {
    label: section.title,
    value: section.id,
  };
});
const TabForm = (props: TabFormProps) => {
  const { bindFormNav, onSelectSection } = useFormLayout();
  const { productFieldArray, addProduct } = useProduct();
  useEffect(() => {
    const sectionId = productFieldArray.map((product, i) => {
      return { label: `${i + 1}: product`, value: product.id };
    });
    bindFormNav?.(sectionId, true);
    onSelectSection?.(sectionId?.[0]?.value);
  }, [productFieldArray]);
  const sections = useMemo(() => {
    return productFieldArray.map((product, i) => {
      return (
        <Fragment key={i}>
          <FormProductCard product={product as Record<'id', Product>} index={i}>
            <FormTabs
              sections={formConfigJson.product.sections}
              parent={`product[${i}]`}
            ></FormTabs>
          </FormProductCard>
        </Fragment>
      );
    });
  }, [productFieldArray]);
  return (
    <>
      <FormHeader title='Tab form example' />

      <Page maxWidth='lg' sx={{ pb: 20 }}>
        <PageHeader />
        <Stack direction='row'>
          <Button onClick={addProduct}>Add Product</Button>
        </Stack>
        <Stack direction='row' spacing={2}>
          <Stack flex={1}> {sections}</Stack>
          <FormNav />
        </Stack>
      </Page>
    </>
  );
};
export default TabForm;
