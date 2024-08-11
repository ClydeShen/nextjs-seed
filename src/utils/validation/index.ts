import dayjs from '@libs/dayjs';
import zod from 'zod';
import { dateInput, dateOutput } from './helper';

export const testShema = zod.object({
  shortInput: zod.string().min(1).max(10),
  selectInput: zod.string().min(1).max(10),
  numberInput: zod.coerce.number().positive(),
  checkboxInput: zod.boolean().refine((v) => v, {
    message: 'Checkbox must be checked',
  }),
  autocompleteInput: zod.string().min(1).max(10),
  dateInput: zod
    .union([dateInput, dateOutput])
    .refine((v) => dayjs().isAfter(dayjs(v), 'day'), {
      message: 'Date must be in the past',
    }),
});
