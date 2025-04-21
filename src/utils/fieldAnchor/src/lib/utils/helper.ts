/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Retrieves a value from a nested object using a dot-notation path string.
 * Returns undefined if the path doesn't exist.
 * Does not support array indexing in the path (e.g., 'a.b[0].c').
 *
 * @param obj - The object to traverse.
 * @param path - The dot-notation path string (e.g., 'a.b.c').
 * @returns The value at the specified path, or undefined if not found.
 */
export function getValueByPath(obj: any, path: string): unknown {
  // Basic safety checks
  if (typeof obj !== "object" || obj === null || !path) {
    return undefined
  }

  const properties: string[] = path.split(".")
  let current: any = obj

  for (const prop of properties) {
    if (typeof current !== "object" || current === null || !(prop in current)) {
      return undefined // Path segment not found or cannot traverse further
    }
    current = current[prop]
  }

  return current
}

/**
 * Sets a value in a nested object using a dot-notation path string.
 * Creates intermediate objects if they don't exist.
 * Overwrites existing values at the final path segment.
 * Does not support array indexing or creation in the path.
 * Mutates the input object.
 *
 * @param obj - The object to modify. Must be a non-null object.
 * @param path - The dot-notation path string (e.g., 'a.b.c').
 * @param value - The value to set at the specified path.
 * @throws {Error} If the input obj is not a valid object or path is empty.
 * @throws {Error} If an intermediate path segment exists but is not an object.
 */
export function setValueByPath(
  obj: Record<string, any>,
  path: string,
  value: unknown,
): void {
  if (typeof obj !== "object" || obj === null) {
    throw new Error('setValueByPath: Input "obj" must be a non-null object.')
  }
  if (typeof path !== "string" || path.length === 0) {
    throw new Error('setValueByPath: Input "path" must be a non-empty string.')
  }

  const properties: string[] = path.split(".")
  let current: any = obj

  for (let i = 0; i < properties.length - 1; i++) {
    const prop = properties[i]

    // If the path segment doesn't exist, create an object.
    if (current[prop] === undefined || current[prop] === null) {
      current[prop] = {}
    }
    // If it exists but isn't an object, we cannot proceed.
    else if (typeof current[prop] !== "object") {
      throw new Error(
        `setValueByPath: Path segment "${prop}" exists but is not an object.`,
      )
    }

    current = current[prop]
  }

  // Set the value at the final segment.
  const finalProp = properties[properties.length - 1]
  current[finalProp] = value
}

/**
 * Checks if a path string contains the array wildcard [*].
 * @param path - The path string.
 * @returns True if the path contains [*], false otherwise.
 */
export function pathContainsWildcard(path: string): boolean {
  return path.includes("[*]")
}

/**
 * Extracts the base path before the first wildcard.
 * Example: "items[*].value" -> "items"
 * Example: "users[0].addresses[*].street" -> "users[0].addresses"
 * @param path - The path string containing a wildcard.
 * @returns The base path string, or the original path if no wildcard is found.
 */
export function getBasePathFromWildcard(path: string): string {
  const wildcardIndex = path.indexOf("[*]")
  if (wildcardIndex === -1) {
    return path // No wildcard found
  }
  // Find the last dot or opening bracket *before* the wildcard
  const lastSeparator = Math.max(
    path.lastIndexOf(".", wildcardIndex),
    path.lastIndexOf("[", wildcardIndex),
  )
  // If no separator before, return the part before wildcard, otherwise return up to separator
  return lastSeparator === -1
    ? path.substring(0, wildcardIndex)
    : path.substring(0, lastSeparator)

  // Simpler alternative if we only care about the top-level array:
  // return path.substring(0, path.indexOf('[*]'));
}

/**
 * Extracts the relative path after the first wildcard's closing bracket.
 * Example: "items[*].value" -> "value"
 * Example: "users[*].addresses[0].street" -> "addresses[0].street"
 * @param path - The path string containing a wildcard.
 * @returns The relative path string, or empty string if no wildcard/suffix exists.
 */
export function getRelativePathAfterWildcard(path: string): string {
  const wildcardEndIndex = path.indexOf("[*]")
  if (wildcardEndIndex === -1) {
    return "" // No wildcard
  }
  // Find the position after '[*]'
  const afterWildcardIndex = wildcardEndIndex + 3 // Length of '[*]'
  // Skip potential dot separator immediately after wildcard
  if (path.charAt(afterWildcardIndex) === ".") {
    return path.substring(afterWildcardIndex + 1)
  }
  return path.substring(afterWildcardIndex)
}

/**
 * Replaces the first wildcard [*] with a specific index [i].
 * Example: ("items[*].value", 0) -> "items[0].value"
 * @param path - The path string with a wildcard.
 * @param index - The index to substitute.
 * @returns The resolved path string.
 */
export function resolveWildcardPath(path: string, index: number): string {
  return path.replace("[*]", `[${index}]`)
}
