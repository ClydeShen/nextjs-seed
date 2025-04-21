import {
  FieldDefinition,
  FieldDefinitionGetter,
  FieldUniqueIdentifier,
  IRegistryGetter,
} from "../utils/types"
import { defaultFieldRegistry } from "./mappings"

// --- Factory Function ---
/**
 * Creates a specific field definition getter bound to a registry.
 */
export function makeGetFieldDefinition(
  registryGetter: IRegistryGetter,
): FieldDefinitionGetter {
  return (fuid: FieldUniqueIdentifier): FieldDefinition | undefined => {
    return registryGetter.get(fuid)
  }
}

// --- Default Instance ---
/**
 * Default field getter instance configured with the defaultFieldRegistry.
 */
const getField: FieldDefinitionGetter =
  makeGetFieldDefinition(defaultFieldRegistry)

// --- Exports ---
export default getField // Export the default instance

// Also export the factory and registry for flexibility
export * as Fuid from "./fuid" // Re-export FUID constants for easier access
export { defaultFieldRegistry } from "./mappings"
