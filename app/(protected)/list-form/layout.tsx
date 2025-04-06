import { ConfigFormProvider } from '@hooks/useForm';
import { FormLayoutProvider } from '@hooks/useFormLayout/useFormLayout';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function ListFormLayout({ children }: LayoutProps) {
  return (
    <ConfigFormProvider>
      <FormLayoutProvider>{children}</FormLayoutProvider>
    </ConfigFormProvider>
  );
}
