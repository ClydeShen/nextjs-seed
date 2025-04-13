// Field validation rule operators
export type OperatorType =
  | 'equals'
  | 'notEquals'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'matches'
  | 'notMatches';

export type FieldInputType =
  | 'text'
  | 'number'
  | 'date'
  | 'datetime'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'selector'
  | 'typography'
  | 'boolean';

export type FieldDataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'email'
  | 'object'
  | 'array'
  | 'function';

export type BlockType = 'regular' | 'table' | 'mdx' | 'product';

export type RowType = 'regular' | 'mdx';

export type CellType =
  | 'typography'
  | 'link'
  | 'values'
  | 'textInput'
  | 'checkbox';

export interface Condition {
  fieldRef: string;
  operator: OperatorType;
  value?: any;
}
export interface When {
  if: Condition;
}
export type DynamicBoolean = boolean | When;

export interface StringValidationRules {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  regex?: string;
  email?: boolean;
}
export interface NumberValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
}
export interface DateValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
}
// Validation rules and messages
export interface ValidationRules
  extends StringValidationRules,
    NumberValidationRules,
    DateValidationRules {}

export interface ValidationMessages {
  required?: string;
  maxLength?: string;
  minLength?: string;
  max?: string;
  min?: string;
  range?: string;
  email?: string;
  regex?: string;
}

export interface FieldValidation {
  rules: ValidationRules;
  messages: ValidationMessages;
}

// Field definition
export interface Field {
  fuid: string;
  type: FieldDataType;
  parent?: string;
  label: string;
  description?: string;
  defaultValue?: any;
  validation?: FieldValidation;
  readOnly?: boolean;
  placeholder?: string;
  options?: LabelValue[];
}

export interface LabelValue {
  label: string;
  value: string;
}
// Field in a row
export interface FieldInput {
  fieldRef: string;
  type: FieldInputType;
  placeholder?: string;
  readOnly?: boolean;
  options?: LabelValue[];
  columns?: TableColumn;
}

// Row structure
export interface Row {
  label?: string;
  type?: RowType;
  template?: string;
  description?: string;
  required?: boolean;
  fields: FieldInput[];
  hide?: DynamicBoolean;
  columns?: TableColumn;
}

// Table column definition
export interface TableColumn {
  label: string;
  type: CellType;
  fieldRef: string;
}

// Block structure (regular block or table block)
export interface Block {
  id?: string;
  title?: string;
  description?: string;
  type?: BlockType;
  rows?: Row[];
  columns?: TableColumn[];
  hide?: DynamicBoolean;
}

export interface Action {
  label?: string;
  type?: string;
  steps?: string[];
}

export interface SectionAction {
  label?: string;
  type?: string;
  steps?: string[];
}
// Section structure
export interface Section {
  id: string;
  title?: string;
  children: Block[];
  actions?: SectionAction[];
}

// Layout structure
export interface Layout {
  sections: Section[];
}
// Config JSON structure
export interface ConfigJSON {
  templateId: string;
  meta: {
    description?: string;
    version?: string;
    author?: string;
    date?: string;
    catalogue?: string[];
  };
  fields: Field[];
  layout?: Layout;
  product?: Layout;
  review?: Layout;
  declarationGroup?: Layout;
}
