/* eslint-disable @typescript-eslint/no-explicit-any */
export type FieldUniqueIdentifier = string & {
  readonly __brand: "FieldUniqueIdentifier"
}
// ... other types and interfaces ...
export type ServiceName =
  | "DFE"
  | "CORE"
  | "SF"
  | "B2G"
  | "TEO"
  | "iText"
  | "DOCS"
  | "UNKNOWN"
export interface ServiceFieldRepresentation {
  readonly path: string
}
export interface FieldDefinition {
  readonly fuid: FieldUniqueIdentifier
  readonly description?: string
  readonly serviceRepresentations: Readonly<
    Partial<Record<ServiceName, ServiceFieldRepresentation>>
  >
}
export interface IRegistryGetter {
  get(key: FieldUniqueIdentifier): FieldDefinition | undefined
}
export interface IRegistryIterator {
  values(): IterableIterator<FieldDefinition>
}
export interface IFieldRegistry extends IRegistryGetter, IRegistryIterator {}
export type FieldDefinitionGetter = (
  fuid: FieldUniqueIdentifier,
) => FieldDefinition | undefined
export type DataConverter = (
  sourceData: Record<string, any>,
) => Record<string, any>
export type ServiceConverterFactory = (
  fromService: ServiceName,
  targetService: ServiceName,
) => DataConverter
export type ConverterFactory = (
  registry?: IFieldRegistry,
) => ServiceConverterFactory
