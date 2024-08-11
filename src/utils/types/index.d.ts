import { NextAuthSession } from 'next-auth';

export interface Session extends NextAuthSession {
  user?: {
    id: string;
    email?: string;
    given_name?: string;
    family_name?: string;
    roles?: string[];
    groups?: string[];
    party_id?: string;
  };
  token?: {
    id_token?: string;
    refresh_token?: string;
    token_type?: string;
    iat?: number;
    exp?: number;
    jti?: string;
  };
}

export interface LabelValue {
  label: string;
  value: string;
}
