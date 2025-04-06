import type { ConfigJSON } from 'form';

const formConfig = {
  templateId: 'templateId-0001',
  meta: {
    description: 'This is a sample form configuration file',
    version: '1.0.0',
    author: 'Your Name',
    date: '2023-10-01',
    catalogue: ['fields', 'layout'],
  },
  fields: [
    {
      fuid: '_requestName',
      type: 'string',
      parent: 'root',
      label: 'Request name',
      description: 'Name this export request in your own words.',
      validation: {
        rules: {
          required: true,
          maxLength: 20,
        },
        messages: {
          required: 'Request name is required',
          maxLength: 'Request name cannot exceed 20 characters',
        },
      },
    },
    {
      fuid: '_dueDate',
      type: 'date',
      parent: 'root',
      label: 'Due date for final certificate',
      description: 'Select the due date for the final certificate.',
      validation: {
        rules: {
          required: true,
        },
        messages: {
          required: 'Due date is required',
          min: 'Due date must be today or later',
        },
      },
    },
    {
      fuid: '_exporterName',
      type: 'string',
      parent: 'root',
      label: 'Exporter name',
      description: 'Enter the name of the exporter.',
      validation: {
        rules: {
          required: true,
          maxLength: 50,
        },
        messages: {
          required: 'Exporter name is required',
          maxLength: 'Exporter name cannot exceed 50 characters',
        },
      },
    },
    {
      fuid: '_exporterEmail',
      type: 'string',
      parent: 'root',
      label: 'Email',
      description: 'Enter the email address of the exporter.',
      validation: {
        rules: {
          required: true,
          email: true,
          maxLength: 50,
        },
        messages: {
          required: 'Email is required',
          email: 'Invalid email format',
          maxLength: 'Email cannot exceed 50 characters',
        },
      },
    },
    {
      fuid: '_exporterAddress',
      type: 'string',
      parent: 'root',
      label: 'Exporter address',
      description: 'Enter the address of the exporter.',
      validation: {
        rules: {
          required: true,
          maxLength: 100,
        },
        messages: {
          required: 'Exporter address is required',
          maxLength: 'Exporter address cannot exceed 100 characters',
        },
      },
    },
    {
      fuid: '_transportMode',
      type: 'string',
      parent: 'root',
      label: 'Transport method',
      description: 'Select the transport method.',
      validation: {
        rules: {
          required: true,
        },
        messages: {
          required: 'Transport method is required',
        },
      },
    },
    {
      fuid: '_departureDateTime',
      type: 'datetime',
      parent: 'root',
      label: 'Departure date/time',
      description: 'Select the departure date and time.',
      validation: {
        rules: {
          required: true,
        },
        messages: {
          required: 'Departure date/time is required',
        },
      },
    },
    {
      fuid: '_additionalNotes',
      type: 'string',
      parent: 'root',
      label: 'Additional notes',
      description: 'Enter any additional notes.',
      validation: {
        rules: {
          maxLength: 255,
        },
        messages: {
          maxLength: 'Additional notes cannot exceed 255 characters',
        },
      },
    },
    {
      fuid: '_productName',
      type: 'string',
      parent: 'product',
      label: 'Product',
      defaultValue: 'product1',
      description: 'Enter the name of the product.',
      validation: {
        rules: {
          required: true,
          maxLength: 50,
        },
        messages: {
          required: 'Product name is required',
          maxLength: 'Product name cannot exceed 50 characters',
        },
      },
    },
    {
      fuid: '_productQuantity',
      type: 'number',
      parent: 'product',
      label: 'Quantity',
      defaultValue: 1,
      description: 'Enter the quantity of the product.',
      validation: {
        rules: {
          required: true,
          min: 1,
        },
        messages: {
          required: 'Product quantity is required',
          min: 'Product quantity must be at least 1',
        },
      },
    },
    {
      fuid: '_productUnitPrice',
      type: 'number',
      parent: 'product',
      label: 'Unit price',
      defaultValue: 5,
      description: 'Enter the unit price of the product.',
      validation: {
        rules: {
          required: true,
          min: 0,
        },
        messages: {
          required: 'Unit price is required',
          min: 'Unit price must be at least 0',
        },
      },
    },
    {
      fuid: '_productTotalPrice',
      type: 'number',
      parent: 'product',
      label: 'Total price',
      description: 'Enter the total price of the product.',
      validation: {
        rules: {
          required: true,
          min: 0,
        },
        messages: {
          required: 'Total price is required',
          min: 'Total price must be at least 0',
        },
      },
    },
    {
      fuid: '_declaration',
      type: 'boolean',
      parent: 'root',
      label: 'Declaration',
      validation: {
        rules: {
          required: true,
        },
        messages: {
          required: 'Declaration is required',
        },
      },
    },
    {
      fuid: '_certificateSigningOffice',
      type: 'string',
      parent: 'root',
      label: 'Certificate signing office',
      description: 'Select the certificate signing office.',
      validation: {
        rules: {
          required: true,
        },
        messages: {
          required: 'Certificate signing office is required',
        },
      },
    },
    {
      fuid: '_certificateDeliveryMethod',
      type: 'string',
      parent: 'root',
      label: 'Certificate delivery method',
      description: 'Select the certificate delivery method.',
      validation: {
        rules: {
          required: true,
        },
        messages: {
          required: 'Certificate delivery method is required',
        },
      },
    },
    {
      fuid: '_certificateDeliveryAddress',
      type: 'string',
      parent: 'root',
      label: 'Certificate delivery address',
      description: 'Enter the certificate delivery address.',
      validation: {
        rules: {
          required: true,
          maxLength: 100,
        },
        messages: {
          required: 'Certificate delivery address is required',
          maxLength:
            'Certificate delivery address cannot exceed 100 characters',
        },
      },
    },
  ],
  layout: {
    sections: [
      {
        id: 'requestDetails',
        title: 'Request details',
        children: [
          {
            rows: [
              {
                label: 'Request name',

                required: true,
                fields: [
                  {
                    fieldRef: '_requestName',
                    type: 'text',
                    placeholder: 'Enter request name',
                  },
                ],
              },
              {
                label: 'Due date for final certificate',
                required: true,
                fields: [
                  {
                    fieldRef: '_dueDate',
                    type: 'date',
                    placeholder: 'Select due date',
                  },
                ],
              },
            ],
          },
          {
            title: 'Exporter details',
            rows: [
              {
                label: 'Exporter name',

                required: true,
                fields: [
                  {
                    fieldRef: '_exporterName',
                    type: 'text',
                    placeholder: 'Enter exporter name',
                  },
                ],
              },
              {
                label: 'Email',
                required: true,
                fields: [
                  {
                    fieldRef: '_exporterEmail',
                    type: 'text',
                    placeholder: 'Enter exporter email',
                  },
                ],
              },
              {
                label: 'Exporter address',
                required: true,
                fields: [
                  {
                    fieldRef: '_exporterAddress',
                    type: 'text',
                    placeholder: 'Enter exporter address',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'transportDetails',
        title: 'Transport details',
        children: [
          {
            rows: [
              {
                label: 'Transport method',
                required: true,
                fields: [
                  {
                    fieldRef: '_transportMode',
                    type: 'radio',
                    options: [
                      { value: 'air', label: 'Air' },
                      { value: 'sea', label: 'Sea' },
                    ],
                  },
                ],
              },
              {
                label: 'Departure date/time',
                required: true,
                fields: [
                  {
                    fieldRef: '_departureDateTime',
                    type: 'datetime',
                    placeholder: 'Select departure date/time',
                  },
                ],
              },
              {
                label: 'Additional notes',
                fields: [
                  {
                    fieldRef: '_additionalNotes',
                    type: 'textarea',
                    placeholder: 'Enter any additional notes',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'product',
        title: 'Products',
        children: [
          {
            type: 'product',
            columns: [
              {
                label: 'Product',
                type: 'typography',
                fieldRef: '_productName',
              },
              {
                label: 'Quantity',
                type: 'typography',
                fieldRef: '_productQuantity',
              },
              {
                label: 'Unit price',
                type: 'typography',
                fieldRef: '_productUnitPrice',
              },
              {
                label: 'Total price',
                type: 'typography',
                fieldRef: '_productTotalPrice',
              },
            ],
          },
        ],
      },
      {
        id: 'declaration',
        title: 'Declaration',
        children: [
          {
            type: 'mdx',
            rows: [
              {
                template: `
                # Declaration of Agreement

By submitting this form, I hereby declare that:

**Exporter Information**  

- The **Exporter Name** provided is: \`_exporterName\`. 
- The **Exporter Email** provided is: \`_exporterEmail\`.  

I confirm that these details are accurate and belong to the authorized exporter.

**Transport Details** 
- The selected **Transport Mode** is: \`_transportMode\`. 
- The **Departure Date/Time** is: \`_departureDateTime\`. 

I confirm that these transport details are correct and align with the planned shipment.

**Accuracy of Information**  

- I understand that any false or misleading information may result in the rejection of this request or other legal consequences. 
- I agree to comply with all applicable laws, regulations, and guidelines related to this request.

**Verification and Terms**  

- I acknowledge that the organization processing this request reserves the right to verify the information provided and may contact me for further clarification if needed. 
- I accept the terms and conditions outlined by the organization, including but not limited to the privacy policy and data usage agreement.
`,
                fields: [
                  {
                    fieldRef: '_exporterName',
                    type: 'text',
                    readOnly: true,
                  },
                  {
                    fieldRef: '_exporterEmail',
                    type: 'text',
                    readOnly: true,
                  },
                  {
                    fieldRef: '_transportMode',
                    type: 'text',
                    readOnly: true,
                  },
                  {
                    fieldRef: '_departureDateTime',
                    type: 'datetime',
                    readOnly: true,
                  },
                ],
              },
              {
                template: `\`_declaration\`      **I confirm that I have read and understood the above declaration.**`,
                fields: [
                  {
                    fieldRef: '_declaration',
                    type: 'checkbox',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'recivingYourCertificates',
        title: 'Reciving Your Certificates',
        children: [
          {
            rows: [
              {
                label: 'Certificate signing office',
                required: true,
                fields: [
                  {
                    fieldRef: '_certificateSigningOffice',
                    type: 'selector',
                    placeholder: 'Enter certificate signing office',
                    options: [
                      {
                        value: 'office1',
                        label: 'Certificate Signing Office 1',
                      },
                      {
                        value: 'office2',
                        label: 'Certificate Signing Office 2',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Certificate delivery method',
                required: true,
                fields: [
                  {
                    fieldRef: '_certificateDeliveryMethod',
                    type: 'selector',
                    placeholder: 'Select certificate delivery method',
                    options: [
                      {
                        value: 'delivery',
                        label: 'Delivery',
                      },
                      {
                        value: 'pickup',
                        label: 'Pickup',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Certificate delivery address',
                required: true,
                hide: {
                  if: {
                    fieldRef: '_certificateDeliveryMethod',
                    operator: 'notEquals',
                    value: 'delivery',
                  },
                },
                fields: [
                  {
                    fieldRef: '_certificateDeliveryAddress',
                    type: 'text',
                    placeholder: 'Enter certificate delivery address',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies ConfigJSON;

export default formConfig;
