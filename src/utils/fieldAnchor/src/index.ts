// --- Re-export FUID constants under the Fuid namespace ---
export * as Fuid from "./lib/fields/fuid"

// --- Export Core Types & Interfaces ---
export type {
  ConverterFactory,
  DataConverter,
  FieldDefinition,
  FieldDefinitionGetter,
  FieldUniqueIdentifier,
  IFieldRegistry,
  IRegistryGetter,
  IRegistryIterator,
  ServiceConverterFactory,
  ServiceFieldRepresentation,
  ServiceName,
} from "./lib/utils/types"

// --- Export Factories & Default Registry ---
export { makeConverterFactory } from "./lib/fieldConvertor"
export { defaultFieldRegistry, makeGetFieldDefinition } from "./lib/fields"

// --- Export Default Instances for Convenience ---
export { default as createConvertor } from "./lib/fieldConvertor"
export { default as getField } from "./lib/fields"
