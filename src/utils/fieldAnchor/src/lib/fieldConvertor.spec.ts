// src/lib/fieldConvertor.test.ts

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { makeConverterFactory } from './fieldConvertor';
import type {
  FieldDefinition,
  FieldUniqueIdentifier,
  IFieldRegistry,
  ServiceName,
} from './utils/types';

// --- Test Setup ---
const TEST_SERVICE_A = 'SERVICE_A' as ServiceName;
const TEST_SERVICE_B = 'SERVICE_B' as ServiceName;
const FUID_SIMPLE = 'TEST.SIMPLE' as FieldUniqueIdentifier;
const FUID_NESTED = 'TEST.NESTED.VALUE' as FieldUniqueIdentifier;
const FUID_ARRAY_ITEM = 'TEST.ARRAY[*].ITEM' as FieldUniqueIdentifier;
const FUID_A_ONLY = 'TEST.A_ONLY' as FieldUniqueIdentifier;
const FUID_B_ONLY = 'TEST.B_ONLY' as FieldUniqueIdentifier;
const FUID_ERROR_TRIGGER = 'TEST.ERROR.TRIGGER' as FieldUniqueIdentifier; // For error test

// --- Test Suites ---

describe('makeConverterFactory', () => {
  describe('Mapping Scenarios (Custom Registry)', () => {
    const mappingRegistry: IFieldRegistry = new Map<
      FieldUniqueIdentifier,
      FieldDefinition
    >([
      [
        FUID_SIMPLE,
        {
          fuid: FUID_SIMPLE,
          description: 'Simple',
          serviceRepresentations: {
            [TEST_SERVICE_A]: { path: 'topLevel' },
            [TEST_SERVICE_B]: { path: 'rootProp' },
          },
        },
      ],
      [
        FUID_NESTED,
        {
          fuid: FUID_NESTED,
          description: 'Nested',
          serviceRepresentations: {
            [TEST_SERVICE_A]: { path: 'a.b.c' },
            [TEST_SERVICE_B]: { path: 'x.y.z' },
          },
        },
      ],
      [
        FUID_ARRAY_ITEM,
        {
          fuid: FUID_ARRAY_ITEM,
          description: 'Array Item',
          // Path for index 0 only
          serviceRepresentations: {
            [TEST_SERVICE_A]: { path: 'items[*].value' },
            [TEST_SERVICE_B]: { path: 'elements[*].data' },
          },
        },
      ],
      [
        FUID_A_ONLY,
        {
          fuid: FUID_A_ONLY,
          description: 'A Only',
          serviceRepresentations: { [TEST_SERVICE_A]: { path: 'propA' } },
        },
      ],
    ]);

    const factory = makeConverterFactory(mappingRegistry);
    const converter = factory(TEST_SERVICE_A, TEST_SERVICE_B);

    // ... tests for basic, nested, ignored fields, missing source, empty source, null/undefined ...
    // (Keep these tests as they were likely correct)

    it('should map basic top-level fields', () => {
      const sourceData = { topLevel: 'value1' };
      const expectedTargetData = { rootProp: 'value1' };
      expect(converter(sourceData)).toEqual(expectedTargetData);
    });

    it('should map nested fields using dot notation', () => {
      const sourceData = { a: { b: { c: 123 } } };
      const expectedTargetData = { x: { y: { z: 123 } } };
      expect(converter(sourceData)).toEqual(expectedTargetData);
    });

    it('should create nested target structures as needed', () => {
      const sourceData = { a: { b: { c: 456 } } };
      const expectedTargetData = { x: { y: { z: 456 } } };
      expect(converter(sourceData)).toEqual(expectedTargetData); // Tests setValueByPath creation
    });

    it('should map corresponding items between arrays using [*] notation (REQUIRES CONVERTER ENHANCEMENT)', () => {
      const sourceData = {
        items: [
          { value: 'first', otherPropA: 1 },
          { value: 'second', otherPropA: 2 },
        ],
      };
      // *** UPDATED EXPECTATION ***
      // This reflects the desired outcome where each item is mapped.
      const expectedTargetData = {
        elements: [
          { data: 'first' }, // Item 0 mapped
          { data: 'second' }, // Item 1 mapped
        ],
      };

      // ** NOTE **
      // This test defines the EXPECTED behavior for array mapping with wildcards.
      // It WILL LIKELY FAIL with the current `createOptimizedMappingConverter`
      // implementation, as that logic does not iterate arrays based on [*].
      // This test serves as a requirement for enhancing the converter function.
      const result = converter(sourceData); // Call the converter
      expect(result).toEqual(expectedTargetData);
    });

    it('should ignore fields present in source but not mapped for the target service', () => {
      const sourceData = { topLevel: 'v1', propA: 'only A' }; // propA has no SERVICE_B mapping
      const expectedTargetData = { rootProp: 'v1' };
      expect(converter(sourceData)).toEqual(expectedTargetData);
    });

    it('should ignore fields defined in registry but missing from source data', () => {
      const sourceData = {
        a: {
          b: {
            /* c is missing */
          },
        },
      }; // FUID_NESTED path won't resolve fully
      const expectedTargetData = {}; // Nothing should be mapped
      expect(converter(sourceData)).toEqual(expectedTargetData);
    });

    it('should handle empty source object', () => {
      expect(converter({})).toEqual({});
    });

    it('should handle source data with null/undefined values (should not map undefined)', () => {
      const sourceData = { topLevel: null, a: { b: { c: undefined } } };
      const expectedTargetData = { rootProp: null }; // Maps null, skips undefined path value
      expect(converter(sourceData)).toEqual(expectedTargetData);
    });
  });

  describe('Error Handling Scenario', () => {
    let consoleSpy: vi.SpyInstance;

    beforeEach(() => {
      // Spy on console.error before each test in this block
      consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      // Restore console.error after each test
      consoleSpy.mockRestore();
    });

    it('should log an error and skip the field if setValueByPath throws', () => {
      // Setup registry to cause an error: Try setting a property on a string
      const errorRegistry: IFieldRegistry = new Map([
        [
          FUID_SIMPLE, // This field will be set correctly first
          {
            fuid: FUID_SIMPLE,
            description: 'Simple',
            serviceRepresentations: {
              [TEST_SERVICE_A]: { path: 'okProp' },
              [TEST_SERVICE_B]: { path: 'propThatWillBeString' },
            },
          },
        ],
        [
          FUID_ERROR_TRIGGER, // This field tries to write to propThatWillBeString.path
          {
            fuid: FUID_ERROR_TRIGGER,
            description: 'Error Trigger',
            serviceRepresentations: {
              [TEST_SERVICE_A]: { path: 'errorTrigger' },
              [TEST_SERVICE_B]: { path: 'propThatWillBeString.path' },
            },
          },
        ],
        [
          FUID_NESTED, // This should still process fine after the error
          {
            fuid: FUID_NESTED,
            description: 'Nested Good',
            serviceRepresentations: {
              [TEST_SERVICE_A]: { path: 'good.nested' },
              [TEST_SERVICE_B]: { path: 'fine.nested' },
            },
          },
        ],
      ]);

      const factory = makeConverterFactory(errorRegistry);
      const converter = factory(TEST_SERVICE_A, TEST_SERVICE_B);

      const sourceData = {
        okProp: 'I am a string', // This makes target.propThatWillBeString a string
        errorTrigger: 'This value will fail to set', // Trying to set .path on the string above
        good: { nested: 'Works fine' },
      };

      // Execute conversion
      const result = converter(sourceData);

      // Expectation: The field causing the error is skipped, others are processed
      expect(result).toEqual({
        propThatWillBeString: 'I am a string', // Set by FUID_SIMPLE
        // The 'propThatWillBeString.path' mapping failed and was skipped
        fine: { nested: 'Works fine' }, // Set by FUID_NESTED
      });

      // Check if console.error was called by the catch block in createMappingConverter
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Error processing FUID ${FUID_ERROR_TRIGGER}`), // Check if the correct FUID is mentioned
        expect.anything() // Check if error object and details were logged
      );
    });
  });
});
