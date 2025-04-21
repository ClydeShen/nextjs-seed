/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { defaultFieldRegistry } from "./fields/mappings"
import {
  getBasePathFromWildcard,
  getRelativePathAfterWildcard,
  getValueByPath,
  pathContainsWildcard,
  setValueByPath,
} from "./utils/helper"
import type {
  DataConverter,
  FieldDefinition,
  IFieldRegistry,
  ServiceConverterFactory,
  ServiceName,
} from "./utils/types"

// createIdentityConverter remains the same
function createIdentityConverter(serviceName: ServiceName): DataConverter {
  console.warn(
    `FieldAnchor: Creating identity converter (deep clone) for service '${serviceName}'.`,
  )
  return (sourceData: Record<string, any>): Record<string, any> => {
    try {
      return structuredClone(sourceData)
    } catch (e) {
      console.error(
        `FieldAnchor: Failed structuredClone during identity conversion for '${serviceName}'. Falling back to shallow copy.`,
        e,
      )
      return { ...sourceData }
    }
  }
}

// ** NEW: Enhanced Mapping Converter **
/**
 * Creates a DataConverter function that transforms data, including handling [*] wildcards for arrays.
 *
 * @param relevantDefinitions - An array of FieldDefinitions applicable to the specific from/to service pair.
 * @param fromService - The name of the source service.
 * @param targetService - The name of the target service.
 * @returns A DataConverter function for the specified transformation.
 */
function createEnhancedMappingConverter( // Renamed
  allRelevantDefinitions: ReadonlyArray<FieldDefinition>,
  fromService: ServiceName,
  targetService: ServiceName,
): DataConverter {
  // --- Pre-process definitions ---
  const simpleMappings: FieldDefinition[] = []
  // Group array item mappings by their SOURCE base path
  const arrayItemMappingsBySourceBase = new Map<string, FieldDefinition[]>()

  for (const def of allRelevantDefinitions) {
    const sourcePath = def.serviceRepresentations[fromService]?.path
    const targetPath = def.serviceRepresentations[targetService]?.path

    // Basic check: ensure both paths exist for this definition
    if (!sourcePath || !targetPath) continue

    if (pathContainsWildcard(sourcePath) && pathContainsWildcard(targetPath)) {
      const sourceBasePath = getBasePathFromWildcard(sourcePath)
      if (!arrayItemMappingsBySourceBase.has(sourceBasePath)) {
        arrayItemMappingsBySourceBase.set(sourceBasePath, [])
      }
      arrayItemMappingsBySourceBase.get(sourceBasePath)?.push(def)
    } else if (
      !pathContainsWildcard(sourcePath) &&
      !pathContainsWildcard(targetPath)
    ) {
      // Only handle simple mappings if neither path has a wildcard
      simpleMappings.push(def)
    } else {
      // Log warning for mixed/unsupported path types (e.g., source[*] -> target.value)
      console.warn(
        `FieldAnchor (${fromService}->${targetService}): Skipping definition for FUID ${def.fuid} due to mixed wildcard/non-wildcard paths: ${sourcePath} -> ${targetPath}`,
      )
    }
  }
  // --- End Pre-processing ---

  // --- Return the actual converter function ---
  const converter: DataConverter = (
    sourceData: Record<string, any>,
  ): Record<string, any> => {
    const targetData: Record<string, any> = {}

    // 1. Process Simple Mappings
    for (const def of simpleMappings) {
      const sourcePath = def.serviceRepresentations[fromService]!.path // Safe due to initial check
      const targetPath = def.serviceRepresentations[targetService]!.path // Safe due to initial check
      try {
        const sourceValue = getValueByPath(sourceData, sourcePath)
        if (sourceValue !== undefined) {
          setValueByPath(targetData, targetPath, sourceValue)
        }
      } catch (error) {
        console.error(
          `FieldAnchor (${fromService}->${targetService})[Simple]: Error processing FUID ${def.fuid} (Path: ${sourcePath} -> ${targetPath}).`,
          { error },
        )
      }
    }

    // 2. Process Array Mappings
    for (const [
      sourceBasePath,
      itemDefs,
    ] of arrayItemMappingsBySourceBase.entries()) {
      try {
        const sourceArray = getValueByPath(sourceData, sourceBasePath)

        if (!Array.isArray(sourceArray)) {
          if (sourceArray !== undefined) {
            // Only warn if path exists but isn't array
            console.warn(
              `FieldAnchor (${fromService}->${targetService})[Array]: Source path "${sourceBasePath}" did not resolve to an array. Skipping array mapping for related FUIDs.`,
            )
          }
          continue // Skip if not an array or doesn't exist
        }

        // Determine the target base path (heuristic: use first itemDef's target base path)
        // This assumes all itemDefs mapping from the same sourceBasePath also map to the same targetBasePath.
        const firstTargetBasePath = getBasePathFromWildcard(
          itemDefs[0].serviceRepresentations[targetService]!.path,
        )
        if (!firstTargetBasePath) {
          console.warn(
            `FieldAnchor (${fromService}->${targetService})[Array]: Could not determine target base path for source "${sourceBasePath}". Skipping.`,
          )
          continue
        }

        // Create the target array structure (setValueByPath handles intermediate creation)
        // We only need to ensure the *base* exists if setting items individually. Let's try setting item by item.
        // setValueByPath(targetData, firstTargetBasePath, []); // Initialize target array - maybe not needed if setting items via full path

        const targetArray: any[] = [] // Build target array separately for clarity

        for (let i = 0; i < sourceArray.length; i++) {
          const sourceItem = sourceArray[i]
          const targetItem: Record<string, any> = {} // Build each target item

          for (const itemDef of itemDefs) {
            const itemSourcePath =
              itemDef.serviceRepresentations[fromService]!.path
            const itemTargetPath =
              itemDef.serviceRepresentations[targetService]!.path

            // Get relative paths for accessing within the item
            const relativeSourcePath =
              getRelativePathAfterWildcard(itemSourcePath)
            const relativeTargetPath =
              getRelativePathAfterWildcard(itemTargetPath)

            if (!relativeTargetPath) {
              // Cannot set value if no target property defined
              console.warn(
                `FieldAnchor (${fromService}->${targetService})[ArrayItem]: Invalid relative target path for FUID ${itemDef.fuid}. Target Path: ${itemTargetPath}`,
              )
              continue
            }

            try {
              // Get value from the current source item using its relative path
              const sourceValue = getValueByPath(sourceItem, relativeSourcePath)

              if (sourceValue !== undefined) {
                // Set value in the target item using its relative path
                setValueByPath(targetItem, relativeTargetPath, sourceValue)
              }
            } catch (itemError) {
              console.error(
                `FieldAnchor (${fromService}->${targetService})[ArrayItem]: Error processing FUID ${itemDef.fuid} at index ${i} (RelPath: ${relativeSourcePath} -> ${relativeTargetPath}).`,
                { itemError },
              )
            }
          }
          // Add the fully constructed target item to our temporary array
          targetArray.push(targetItem)
        }
        // Assign the completed target array to the target data structure
        setValueByPath(targetData, firstTargetBasePath, targetArray)
      } catch (arrayError) {
        console.error(
          `FieldAnchor (${fromService}->${targetService})[Array]: Error processing array mapping for source base path "${sourceBasePath}".`,
          { arrayError },
        )
      }
    }

    return targetData
  }
  return converter
}

/**
 * Factory function - Updated to call the enhanced mapping converter.
 */
export function makeConverterFactory(
  registry: IFieldRegistry = defaultFieldRegistry,
): ServiceConverterFactory {
  const allDefinitions = Array.from(registry.values())

  return (
    fromService: ServiceName,
    targetService: ServiceName,
  ): DataConverter => {
    if (fromService === targetService) {
      return createIdentityConverter(fromService)
    } else {
      // Filter definitions relevant for THIS specific service pair *once*
      // Need to check if representations exist for *both* services
      const relevantDefinitions = allDefinitions.filter(
        (def) =>
          def.serviceRepresentations[fromService] &&
          def.serviceRepresentations[targetService],
      )

      if (relevantDefinitions.length === 0) {
        console.warn(
          `FieldAnchor (${fromService}->${targetService}): No relevant field definitions found for this service pair. Converter will produce empty objects.`,
        )
        // Return a converter that does nothing but return empty
        return (_sourceData: Record<string, any>): Record<string, any> => ({})
      }

      // Create the converter using the relevant definitions
      // ** Call the new enhanced function **
      return createEnhancedMappingConverter(
        relevantDefinitions,
        fromService,
        targetService,
      )
    }
  }
}

// --- Default Instance and Exports ---
const createConvertor: ServiceConverterFactory = makeConverterFactory()
export default createConvertor
// makeConverterFactory is already exported by name
