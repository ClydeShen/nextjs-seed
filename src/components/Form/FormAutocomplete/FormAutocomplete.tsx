import {
  Autocomplete,
  MenuItem,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { LabelValue } from '@utils/types';
import { forwardRef, SyntheticEvent, useId, useState } from 'react';
import { get, useController, useFormContext } from 'react-hook-form';

export type FormAutocompleteProps = TextFieldProps & {
  errorMessage?: string;
  name: string;
  options: LabelValue[];
};
export const TextFieldRef = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    return <TextField {...props} ref={ref} />;
  }
);
TextFieldRef.displayName = 'TextFieldRef';
export const FormAutocomplete = (props: FormAutocompleteProps) => {
  const {
    id,
    name,
    errorMessage,
    disabled,
    defaultValue = '',
    options,
    ...textFieldProps
  } = props;
  const autoId = useId();
  const _id = id || autoId;
  const [inputValue, setInputValue] = useState('');
  const { control } = useFormContext();
  const {
    field,
    formState: { errors },
  } = useController({ name, control });
  const { ref: fieldRef, onChange, value: fieldValue, ...fieldProps } = field;
  const error = get(errors, name);
  const changeHandler = (
    e: SyntheticEvent<Element, Event>,
    selected: LabelValue
  ) => {
    field.onChange(selected.value);
  };
  return (
    <Autocomplete
      {...fieldProps}
      value={fieldValue?.value}
      multiple={false}
      id={_id}
      options={options}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option) => option.label}
      onChange={changeHandler}
      isOptionEqualToValue={(option, selected) => {
        return option.value === selected.value;
      }}
      renderOption={(props, option, { selected }) => {
        return (
          <MenuItem {...props} key={props.id} selected={selected}>
            {option.label}
          </MenuItem>
        );
      }}
      renderInput={(params) => {
        const { ref, ...inputProps } = params.inputProps;
        return (
          <TextFieldRef
            {...params}
            error={!!error?.message || !!errorMessage}
            helperText={error?.message || errorMessage}
          />
        );
      }}
      disabled={disabled}
      autoHighlight
    ></Autocomplete>
  );
};
