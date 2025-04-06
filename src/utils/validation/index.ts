// export const testShema = zod.object({}).passthrough();

import { ConfigJSON } from 'form';
import { createValidationSchema } from './helper';

export const createSchema = (json: ConfigJSON) => {
  const schema = createValidationSchema(json.fields);
  return schema;
};
