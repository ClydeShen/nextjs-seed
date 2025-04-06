import type { TableColumn } from '@components/ContentTable/ContentTable';
import { ContentTable } from '@components/ContentTable/ContentTable';
import { Block } from 'form';
export interface FormCardTableSectionProps {
  block: Block;
}
export const FormCardTableSection = (props: FormCardTableSectionProps) => {
  const { block } = props;
  const { columns = [] } = block;
  const tableColumns: TableColumn[] = columns?.map((column) => {
    return {
      label: column.label,
      fieldRef: column.fieldRef,
    };
  });

  return <ContentTable data={} columns={tableColumns} />;
};
