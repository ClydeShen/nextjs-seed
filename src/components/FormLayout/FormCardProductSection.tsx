import { ContentTable } from '@components/ContentTable/ContentTable';
import { useProduct } from '@hooks/useForm/useProduct';
import { Stack } from '@mui/material';
import { Block } from 'form';

export const FormCardProductSection = (block: Block) => {
  const { title, description, columns } = block;
  const { productFieldArray } = useProduct();
  return (
    <Stack>
      <ContentTable data={productFieldArray} columns={columns} />
    </Stack>
  );
};
