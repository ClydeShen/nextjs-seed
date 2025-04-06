export const drawerWidth = 243;

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  TEXTAREA = 'textarea',
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
  BOOLEAN = 'boolean',
  SELECT = 'selector',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

export enum BlockType {
  REGULAR = 'regular',
  TABLE = 'table',
  MDX = 'mdx',
  PRODUCT = 'product',
}

export enum RowType {
  REGULAR = 'regular',
  MDX = 'mdx',
}

export enum CellType {
  TYPOGRAPHY = 'typography',
  LINK = 'link',
  VALUES = 'values',
  TEXT_INPUT = 'textInput',
  CHECKBOX = 'checkbox',
}

export enum OperatorType {
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  IS_EMPTY = 'isEmpty',
  IS_NOT_EMPTY = 'isNotEmpty',
  GREATER_THAN = 'greaterThan',
  LESS_THAN = 'lessThan',
  GREATER_THAN_OR_EQUAL = 'greaterThanOrEqual',
  LESS_THAN_OR_EQUAL = 'lessThanOrEqual',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  MATCHES = 'matches',
  NOT_MATCHES = 'notMatches',
}
