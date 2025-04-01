import { FieldInput } from 'form';
import { FormTextField } from './FormTextField';

export interface FormDynamicInput {
  field: FieldInput;
}
export const FormDynamicInput = (props: FormDynamicInput) => {
  const { field } = props;
  const { fieldRef, type, placeholder, readOnly, options } = field;
  switch (type) {
    default:
      return <FormTextField id={fieldRef} name={fieldRef} />;
  }
};
