import dayjs, { Dayjs } from '@libs/dayjs';
import zod from 'zod';

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
