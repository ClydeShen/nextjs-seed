import { ConfigFormProvider } from '@hooks/useForm';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function ListFormLayout({ children }: LayoutProps) {
  return <ConfigFormProvider>{children}</ConfigFormProvider>;
}
