import { Button, TableCell } from '@mui/material';
import { CellType as TableCellType } from '@utils/constants';
import { CellType } from 'form';
import { get } from 'lodash';
import Link from 'next/link';
import { TableData } from './ContentTable';

interface CellProps {
  type?: CellType;
  row?: TableData;
  fieldRef: string;
}
export const Cell = (props: CellProps) => {
  const { type, row, fieldRef } = props;
  switch (type) {
    case TableCellType.LINK:
      return (
        <TableCell>
          <Link href={'/product-form'}>
            <Button>{get(row, fieldRef)}</Button>
          </Link>
        </TableCell>
      );
    default:
      return <TableCell>{get(row, fieldRef)}</TableCell>;
  }
};
