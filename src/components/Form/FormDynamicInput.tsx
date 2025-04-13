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
  parent?: string;
}
export const FormDynamicInput = (props: FormDynamicInput) => {
  const { field, inline, parent } = props;
  const { fieldRef, type, placeholder, readOnly, options } = field;
  const name = `${parent ? `${parent}.` : ''}${fieldRef}`;
  switch (type) {
    case InputType.DATE:
      return (
        <FormDatepicker
          id={name}
          name={name}
          placeholder={placeholder}
          inline={inline}
        />
      );
    case InputType.DATETIME:
      return (
        <FormDateTimePicker
          id={name}
          name={name}
          placeholder={placeholder}
          inline={inline}
        />
      );
    case InputType.RADIO:
      return (
        <FormRadioGroup
          id={name}
          name={name}
          options={options as readonly LabelValue[]}
          inline={inline}
        />
      );
    case InputType.SELECT:
      return (
        <FormSelector
          id={name}
          name={name}
          options={options as readonly LabelValue[]}
          inline={inline}
        />
      );
    case InputType.CHECKBOX:
      return <FormCheckbox id={name} name={name} inline={inline} />;

    case InputType.TEXTAREA:
      return (
        <FormTextField
          id={name}
          name={name}
          placeholder={placeholder}
          multiline
          rows={2}
          inline={inline}
        />
      );
    default:
      return (
        <FormTextField
          id={name}
          name={name}
          placeholder={placeholder}
          inline={inline}
        />
      );
  }
};
