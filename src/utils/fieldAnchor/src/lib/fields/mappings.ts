import {
  FieldDefinition,
  FieldUniqueIdentifier,
  IFieldRegistry,
} from '../utils/types';
import * as Fuid from './fuid'; // Import the FUIDs from the fuid module
// This concrete implementation uses a Map and implements IFieldRegistry
export const defaultFieldRegistry: IFieldRegistry = new Map<
  FieldUniqueIdentifier,
  FieldDefinition
>([
  [
    Fuid.REQUEST_NAME,
    {
      fuid: Fuid.REQUEST_NAME,
      serviceRepresentations: {
        CORE: { path: 'request.name' },
        DFE: { path: 'requestName' },
      },
    },
  ],
]);
