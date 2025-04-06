import dayjs, { Dayjs } from '@libs/dayjs';
import {
  DateValidationRules,
  Field,
  NumberValidationRules,
  StringValidationRules,
  ValidationMessages,
} from 'form';
import _ from 'lodash';
import zod, { ZodSchema } from 'zod';

export const dayjsInstance = zod.instanceof(dayjs as unknown as typeof Dayjs, {
  message: 'required',
});

export const dateInput = zod
  .string({
    // this is to handle possible null value and to make the error message consistent otherwise it will show 'Expected string, received null' or something like that
    message: 'required',
  })
  .datetime()
  .transform((v: string) => {
    return v && dayjs(v);
  });

export const dateOutput = dayjsInstance
  .refine((v) => v.isValid(), { message: 'Invalid date' })
  .transform((v: Dayjs) => {
    return v?.toISOString();
  });

const createStringSchema =
  (messages: ValidationMessages) => (rule: StringValidationRules) => {
    const { maxLength, minLength, regex, email, required } = rule;
    let fieldSchema = zod.string();
    required &&
      (fieldSchema = fieldSchema.min(1, { message: messages?.required }));
    maxLength &&
      (fieldSchema = fieldSchema.max(maxLength, { message: messages?.max }));
    minLength &&
      (fieldSchema = fieldSchema.min(minLength, { message: messages?.min }));
    regex &&
      (fieldSchema = fieldSchema.regex(new RegExp(regex), {
        message: messages?.regex,
      }));
    email && (fieldSchema = fieldSchema.email(messages?.email));
    return fieldSchema;
  };
const createNumberSchema =
  (messages: ValidationMessages) => (rule: NumberValidationRules) => {
    const { min, max } = rule;
    let schema = zod.coerce.number();
    min && (schema = schema.min(min, { message: messages?.min }));
    max && (schema = schema.max(max, { message: messages?.max }));
    return schema;
  };
const createDateSchema =
  (messages: ValidationMessages) => (rule: DateValidationRules) => {
    const { min, max } = rule;
    const dateRange = dateInput.refine((date) => {
      if (min) {
        return dayjs(date).isAfter(dayjs(min), 'day');
      }
      if (max) {
        return dayjs(date).isBefore(dayjs(max), 'day');
      }
      return true;
    });
    let fieldSchema = zod.union([dateRange, dateOutput]);
    return fieldSchema;
  };

const createDateTimeSchema =
  (messages: ValidationMessages) => (rule: DateValidationRules) => {
    const { min, max } = rule;
    const dateRange = dateInput.refine((date) => {
      if (min) {
        return dayjs(date).isAfter(dayjs(min));
      }
      if (max) {
        return dayjs(date).isBefore(dayjs(max));
      }
      return true;
    });
    let fieldSchema = zod.union([dateRange, dateOutput]);
    return fieldSchema;
  };
const createFieldSchema = (field: Field) => {
  let fieldSchema: ZodSchema;
  const { validation } = field;
  const { rules, messages } = validation || {};
  const { required } = rules || {};
  const stringSchema = createStringSchema(messages as ValidationMessages);
  const numberSchema = createNumberSchema(messages as ValidationMessages);
  const dateSchema = createDateSchema(messages as ValidationMessages);
  const dateTimeSchema = createDateTimeSchema(messages as ValidationMessages);
  switch (field.type) {
    case 'email':
    case 'string':
      fieldSchema = stringSchema(rules as StringValidationRules);
      break;
    case 'number':
      fieldSchema = numberSchema(rules as NumberValidationRules);
      break;
    case 'date':
      fieldSchema = dateSchema(rules as DateValidationRules);
      break;
    case 'datetime':
      fieldSchema = dateTimeSchema(rules as DateValidationRules);
      break;
    default:
      fieldSchema = zod.any();
  }
  if (!required) {
    fieldSchema = fieldSchema.nullish();
  }
  return zod.object({
    [field.fuid]: fieldSchema,
  });
};

export const createValidationSchema = (fields: Field[]) => {
  const groupedFields = _.groupBy(fields, 'parent');
  let schema = zod.object({});
  for (let key in groupedFields) {
    const fields = groupedFields[key];
    if (key === 'root') {
      for (const field of fields) {
        const fieldSchema = createFieldSchema(field);
        schema = schema.merge(fieldSchema);
      }
    } else {
      let childSchema = zod.object({});
      for (const field of fields) {
        const fieldSchema = createFieldSchema(field);
        childSchema = childSchema.merge(fieldSchema);
      }
      schema = schema.merge(
        zod.object({
          [key]: zod.array(childSchema),
        })
      );
    }
  }
  return schema;
};
