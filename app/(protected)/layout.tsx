import { Layout } from '@components/Layout/Layout';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: LayoutProps) {
  return <Layout>{children}</Layout>;
}
