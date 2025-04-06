import { ConfigFormProvider } from '@hooks/useForm';
import { FormLayoutProvider } from '@hooks/useFormLayout/useFormLayout';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function TabFormLayout({ children }: LayoutProps) {
  return (
    <ConfigFormProvider>
      <FormLayoutProvider>{children}</FormLayoutProvider>
    </ConfigFormProvider>
  );
}
