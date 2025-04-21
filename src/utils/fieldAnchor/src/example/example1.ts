import { makeConverterFactory } from '../lib/fieldConvertor';
import * as Fuid from '../lib/fields/fuid';

// prefefine field registry for the example
// we already have a default registry in the library
// but we can create a custom one for the example
const fieldRegistry = new Map([
  [
    Fuid.REQUEST_NAME,
    {
      fuid: Fuid.REQUEST_NAME,
      description: 'The main name or identifier for the export request.',
      serviceRepresentations: {
        DFE: { path: 'requestName' }, // Path in DFE structure
        CORE: { path: 'consignment.title' }, // Path in CORE structure
      },
    },
  ],
  [
    Fuid.REQUEST_PRODUCTS_ARRAY_FUID, // FUID for the array itself
    {
      fuid: Fuid.REQUEST_PRODUCTS_ARRAY_FUID,
      description: 'The list of products included in the request.',
      // ** Enhancement Suggestion: Add a flag for the converter **
      // mapsArrayItems: true, // Hypothetical flag for enhanced converter
      serviceRepresentations: {
        DFE: { path: 'products' }, // Path to the array in DFE
        CORE: { path: 'consignment.products.items' }, // Path to the array in CORE
      },
    },
  ],
  [
    Fuid.REQUEST_PRODUCT_NAME_FUID, // FUID for a field *within* each product item
    {
      fuid: Fuid.REQUEST_PRODUCT_NAME_FUID,
      description: "Name of a specific product in the request's list.",
      serviceRepresentations: {
        // Path includes wildcard for array traversal
        DFE: { path: 'products[*].productName' },
        CORE: { path: 'consignment.products.items[*].name' },
      },
    },
  ],
  [
    Fuid.REQUEST_PRODUCT_PACKAGES_ARRAY_FUID, // FUID for the nested package array
    {
      fuid: Fuid.REQUEST_PRODUCT_PACKAGES_ARRAY_FUID,
      description: 'The list of packages for a specific product.',
      // mapsArrayItems: true, // Hypothetical flag
      serviceRepresentations: {
        // Path includes wildcards for both outer and inner arrays
        DFE: { path: 'products[*].packages' },
        CORE: { path: 'consignment.products.items[*].packagingOptions' },
      },
    },
  ],
  [
    Fuid.REQUEST_PRODUCT_PACKAGE_TYPE_FUID, // FUID for a field *within* each package item
    {
      fuid: Fuid.REQUEST_PRODUCT_PACKAGE_TYPE_FUID,
      description: 'The type of a specific package for a product.',
      serviceRepresentations: {
        // Path includes wildcards for both outer and inner arrays
        DFE: { path: 'products[*].packages[*].packageType' },
        CORE: {
          path: 'consignment.products.items[*].packagingOptions[*].type',
        },
      },
    },
  ],
]);
const createConvertorExample = makeConverterFactory(fieldRegistry);

// --- Using the Converter ---

// Example DFE Form Data
const dfeFormData = {
  _requestName: 'export request 001',
  products: [
    {
      productName: 'p-001',
      packages: [{ packageType: 'container' }, { packageType: 'seal' }],
    },
    {
      productName: 'p-002',
      packages: [
        { packageType: 'box' }, // Changed slightly for illustration
        { packageType: 'pallet' },
      ],
    },
  ],
};

// define the converter
const dfeToCoreConvertor = createConvertorExample('DFE', 'CORE');

// convert the DFE form data to CORE format
const coreFormData = dfeToCoreConvertor(dfeFormData);

// log the converted data
console.log(JSON.stringify(coreFormData, null, 2));
/**
 * Output:
 * {
  "consignment": {
    "products": {
      "items": [
        {
          "productName": "p-001",
          "packages": [
            {
              "packageType": "container"
            },
            {
              "packageType": "seal"
            }
          ]
        },
        {
          "productName": "p-002",
          "packages": [
            {
              "packageType": "box"
            },
            {
              "packageType": "pallet"
            }
          ]
        }
      ]
    }
  }
}
 */
