import formConfigJson from '@config/form.config';
import { getFieldGroup } from '@utils/helper';
import { useEffect } from 'react';
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
    append({
      ...fieldGroup['product'],
    });
    return () => {
      replace([]);
    };
  }, []);
  return { productFieldArray };
};
