'use client';
import formConfigJson from '@config/form.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFromDefaultValue } from '@utils/helper';
import { createSchema } from '@utils/validation';
import { createContext, useContext } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
export interface FormContextValue {
  onSubmit?: (data: any) => void;
}
export interface FormContextProviderProps {
  children?: React.ReactNode;
}
const FormContext = createContext<FormContextValue>({});
const defaultValues = getFromDefaultValue(formConfigJson);
const schema = createSchema(formConfigJson);

export const ConfigFormProvider = (props: FormContextProviderProps) => {
  const { children } = props;

  const form = useForm({
    defaultValues: {
      ...defaultValues,
    },
    resolver: zodResolver(schema),
    shouldUnregister: true,
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
      <FormContext.Provider value={{}}>
        <form onSubmit={onSubmit} noValidate>
          {children}
        </form>
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
