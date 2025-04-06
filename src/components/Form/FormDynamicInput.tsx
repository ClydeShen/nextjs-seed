import { InputType } from '@utils/constants';
import { FieldInput } from 'form';
import { LabelValue } from 'global';
import { FormCheckbox } from './FormCheckbox';
import { FormDatepicker } from './FormDatepicker';
import { FormDateTimePicker } from './FormDateTimePicker';
import { FormRadioGroup } from './FormRadioGroup';
import { FormSelector } from './FormSelector';
import { FormTextField } from './FormTextField';
export interface FormDynamicInput {
  field: FieldInput;
  inline?: boolean;
}
export const FormDynamicInput = (props: FormDynamicInput) => {
  const { field, inline } = props;
  const { fieldRef, type, placeholder, readOnly, options } = field;
  switch (type) {
    case InputType.DATE:
      return (
        <FormDatepicker
          id={fieldRef}
          name={fieldRef}
          placeholder={placeholder}
          inline={inline}
        />
      );
    case InputType.DATETIME:
      return (
        <FormDateTimePicker
          id={fieldRef}
          name={fieldRef}
          placeholder={placeholder}
          inline={inline}
        />
      );
    case InputType.RADIO:
      return (
        <FormRadioGroup
          id={fieldRef}
          name={fieldRef}
          options={options as readonly LabelValue[]}
          inline={inline}
        />
      );
    case InputType.SELECT:
      return (
        <FormSelector
          id={fieldRef}
          name={fieldRef}
          options={options as readonly LabelValue[]}
          inline={inline}
        />
      );
    case InputType.CHECKBOX:
      return <FormCheckbox id={fieldRef} name={fieldRef} inline={inline} />;

    case InputType.TEXTAREA:
      return (
        <FormTextField
          id={fieldRef}
          name={fieldRef}
          placeholder={placeholder}
          multiline
          rows={2}
          inline={inline}
        />
      );
    default:
      return (
        <FormTextField
          id={fieldRef}
          name={fieldRef}
          placeholder={placeholder}
          inline={inline}
        />
      );
  }
};
