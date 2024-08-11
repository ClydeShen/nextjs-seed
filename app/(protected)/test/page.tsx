'use client';
import { FormAutocomplete } from '@components/Form/FormAutocomplete';
import { FormCheckbox } from '@components/Form/FormCheckbox/FormCheckbox';
import { FormDatepicker } from '@components/Form/FormDatepicker';
import { FormNumberField } from '@components/Form/FormNumberField';
import { FormSelector } from '@components/Form/FormSelector/FormSelector';
import { FormTextField } from '@components/Form/FormTextField';
import { Page } from '@components/Page';
import useTestForm from '@hooks/useForm';
import { Button, Stack } from '@mui/material';

const options = [
  { label: 'Test', value: 'test' },
  { label: 'Test2', value: 'test2' },
];

const TestForm = () => {
  const { onSubmit } = useTestForm();
  return (
    <Page>
      test
      <Stack component={'form'} onSubmit={onSubmit} spacing={2}>
        <FormTextField name='shortInput' label='short test' />
        <FormSelector
          name='selectInput'
          label='select test'
          options={options}
        />
        <FormNumberField
          name='numberInput'
          label='number test'
          decimalScale={2}
        />
        <FormCheckbox name='checkboxInput' label='checkbox test' />
        <FormAutocomplete
          name='autocompleteInput'
          label='autocomplete test'
          options={options}
        />
        <FormDatepicker name='dateInput' label='date test' />
        <Button type='submit'>submit</Button>
      </Stack>
    </Page>
  );
};
export default TestForm;
