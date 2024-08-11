'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from '@libs/dayjs';
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

export const TestFormProvider = (props: FormContextProviderProps) => {
  const { children } = props;
  const form = useForm({
    defaultValues: {
      shortInput: '',
      selectInput: '',
      numberInput: undefined,
      checkboxInput: false,
      autocompleteInput: undefined,
      dateInput: dayjs(),
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

const useTestForm = () => {
  const context = useContext(FormContext);
  const form = useFormContext();
  if (context === undefined) {
    throw new Error('useForm must be used within an FormProvider');
  }
  return { ...context, ...form };
};
export default useTestForm;
