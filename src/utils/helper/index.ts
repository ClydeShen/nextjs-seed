import dayjs from '@libs/dayjs';
import { OperatorType } from '@utils/constants';
import { ConfigJSON, DynamicBoolean } from 'form';
import _ from 'lodash';

export const willTokenExpire = (
  expires: number = dayjs().unix(),
  minute = 13
) => dayjs().add(minute, 'minute').isAfter(dayjs.unix(expires));

const getFieldDefaultValue = (field: any) => {
  switch (field.type) {
    case 'date':
    case 'datetime':
      return null;
    case 'boolean':
      return false;
    default:
      // return random words
      return field.defaultValue || '';
  }
};

export const getFromDefaultValue = (configJson: ConfigJSON) => {
  const groupedFeilds = _.groupBy(configJson.fields, 'parent');
  const defaultValues = groupedFeilds['root'].reduce((allValues, field) => {
    const values = allValues;
    if (field.parent !== 'root') return allValues;
    values[field.fuid] = getFieldDefaultValue(field);
    return values;
  }, {} as Record<string, any>);
  return defaultValues;
};

export const getFieldGroup = (configJson: ConfigJSON) => {
  const fieldGroup = configJson.fields.reduce((allValues, field) => {
    _.set(
      allValues,
      `${field.parent}.${field.fuid}`,
      getFieldDefaultValue(field)
    );
    return allValues;
  }, {} as Record<string, any>);
  return fieldGroup;
};

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    window.location.hash = `#${id}`;
  }
};

const getFormValue = (watch: any) => (fieldRef: string) => {
  return watch(fieldRef);
};
export const when = (watch) => (condition: DynamicBoolean) => {
  if (typeof condition === 'boolean') return condition;
  const { operator, value, fieldRef } = condition.if;
  const getValue = getFormValue(watch);
  const compareValue = getValue(fieldRef);
  switch (operator) {
    case OperatorType.EQUALS:
      return compareValue === value;
    case OperatorType.NOT_EQUALS:
      return compareValue !== value;
    case OperatorType.IS_EMPTY:
      return (
        _.isEmpty(compareValue) || _.isNil(compareValue) || compareValue === ''
      );
    case OperatorType.IS_NOT_EMPTY:
      return !(
        _.isEmpty(compareValue) ||
        _.isNil(compareValue) ||
        compareValue === ''
      );
    case OperatorType.GREATER_THAN:
      return compareValue > value;
    case OperatorType.LESS_THAN:
      return compareValue < value;
    case OperatorType.GREATER_THAN_OR_EQUAL:
      return compareValue >= value;
    case OperatorType.LESS_THAN_OR_EQUAL:
      return compareValue <= value;
    case OperatorType.CONTAINS:
      return _.includes(value, compareValue);
    case OperatorType.NOT_CONTAINS:
      return !_.includes(value, compareValue);
    case OperatorType.STARTS_WITH:
      return _.startsWith(compareValue, value);
    case OperatorType.ENDS_WITH:
      return _.endsWith(compareValue, value);
    case OperatorType.MATCHES:
      return new RegExp(value).test(compareValue);
    case OperatorType.NOT_MATCHES:
      return !new RegExp(value).test(compareValue);
    default:
      return false;
  }
};
