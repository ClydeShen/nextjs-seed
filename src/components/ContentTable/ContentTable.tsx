import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { TableColumn } from 'form';
import { get } from 'lodash';
import { Fragment, useMemo } from 'react';

export interface TableData {
  [key: string]: any;
}

export interface ContentTableProps {
  data: TableData[];
  totalNumber?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  columns?: TableColumn[];
}
export const ContentTable = (props: ContentTableProps) => {
  const { columns = [], data } = props;
  const headers = useMemo(() => {
    return columns.map((column, index) => {
      return (
        <TableCell key={column.label} scope='col'>
          <TableSortLabel active direction='asc'>
            {column.label}
          </TableSortLabel>
        </TableCell>
      );
    });
  }, [columns]);
  const tableBody = useMemo(() => {
    return data.map((row, index) => {
      return (
        <Fragment key={index}>
          <TableRow hover>
            {columns.map((col, colIndex) => {
              return (
                <TableCell key={colIndex}>{get(row, col.fieldRef)}</TableCell>
              );
            })}
          </TableRow>
        </Fragment>
      );
    });
  }, [data]);
  return (
    <TableContainer component={Paper} elevation={0} square>
      <Table>
        <TableHead>
          <TableRow>{headers}</TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
};
