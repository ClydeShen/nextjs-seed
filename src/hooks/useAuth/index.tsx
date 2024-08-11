'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext, useState } from 'react';
export interface AuthContextValue {
  authUser?: any;
}
export interface AuthProviderProps {
  children?: React.ReactNode;
}
const AuthContext = createContext<AuthContextValue>({});
export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const session = useSession();
  console.log('session', session);
  const [authUser, setAuthUser] = useState({});
  return (
    <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default useAuth;
