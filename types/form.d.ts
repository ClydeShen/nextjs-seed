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
  | 'object'
  | 'array'
  | 'function';

export type BlockType = 'regular' | 'table' | 'mdx';

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

export interface DynamicCondition {
  if?: Condition;
}

export type DynamicBoolean = boolean | DynamicCondition;

// Validation rules and messages
export interface ValidationRules {
  required?: DynamicBoolean;
  maxLength?: number;
  min?: number;
  range?: { min?: string | number; max?: string | number };
  email?: boolean;
}

export interface ValidationMessages {
  required?: string;
  maxLength?: string;
  min?: string;
  range?: string;
  email?: string;
}

export interface FieldValidation {
  rules: ValidationRules;
  messages: ValidationMessages;
}

// Field definition
export interface Field {
  fuid: string;
  type: FieldDataType;
  label: string;
  description?: string;
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
}

// Row structure
export interface Row {
  label: string;
  description?: string;
  type: FieldInputType;
  required?: boolean;
  fields: FieldInput[];
  hide?: DynamicCondition;
}

// Table column definition
export interface TableColumn {
  label: string;
  type: CellType;
  fieldRef: string;
}

// Block structure (regular block or table block)
export interface Block {
  title?: string;
  description?: string;
  type?: BlockType;
  rows?: Row[];
  columns?: TableColumn[];
  template?: string;
  hide?: DynamicCondition;
}

// Section structure
export interface Section {
  id: string;
  title?: string;
  children: Block[];
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
  layout: Layout;
}
