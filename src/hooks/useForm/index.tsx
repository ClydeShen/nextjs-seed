'use client';
import formConfigJson from '@config/form.config.json';
import { zodResolver } from '@hookform/resolvers/zod';
import { testShema } from '@utils/validation';
import { createContext, useContext } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
export interface FormContextValue {
  onSubmit?: (data: any) => void;
}
export interface FormContextProviderProps {
  children?: React.ReactNode;
}
const FormContext = createContext<FormContextValue>({});

const getDefaultValue = () => {
  const defaultValues = formConfigJson.fields.reduce((_values, field) => {
    const values = _values;
    if (field.type === 'date' || field.type === 'datetime') {
      values[field.fuid] = null;
    } else if (field.type === 'boolean') {
      values[field.fuid] = false;
    } else {
      values[field.fuid] = '';
    }
    return values;
  }, {} as Record<string, any>);
  console.log('defaultValues', defaultValues);
  return defaultValues;
};

export const ConfigFormProvider = (props: FormContextProviderProps) => {
  const { children } = props;

  const form = useForm({
    defaultValues: {
      ...getDefaultValue(),
    },
    resolver: zodResolver(testShema),
  });
  const { handleSubmit } = form;
  const submitHandler = (data) => {
    console.log(data);
  };
  const errorHandler = (error) => {
    console.log(error);
  };
  const onSubmit = handleSubmit(submitHandler, errorHandler);
  return (
    <FormProvider {...form}>
      <FormContext.Provider value={{ onSubmit }}>
        {children}
      </FormContext.Provider>
    </FormProvider>
  );
};

const useConfigForm = () => {
  const context = useContext(FormContext);
  const form = useFormContext();
  if (context === undefined) {
    throw new Error('useForm must be used within an FormProvider');
  }
  return { ...context, ...form };
};
export default useConfigForm;
