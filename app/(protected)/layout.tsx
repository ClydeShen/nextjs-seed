import { AuthProvider } from '@hooks/useAuth';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: LayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
