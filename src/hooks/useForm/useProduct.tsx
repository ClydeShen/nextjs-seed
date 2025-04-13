import formConfigJson from '@config/form.config';
import { getFieldGroup } from '@utils/helper';
import { useCallback, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface UseProductProps {}
const fieldGroup = getFieldGroup(formConfigJson);
export const useProduct = () => {
  const { control } = useFormContext();
  const {
    fields: productFieldArray,
    append,
    remove,
    replace,
  } = useFieldArray({
    control: control,
    name: 'product',
    shouldUnregister: true,
  });
  useEffect(() => {
    addProduct();
  }, []);
  const addProduct = useCallback(() => {
    append({
      ...fieldGroup['product'],
    });
  }, []);
  return { productFieldArray, addProduct };
};
