import { willTokenExpire } from '@utils/helper';
import type { AuthOptions } from 'next-auth';
// call cognito to refresh token
const refreshCognitoToken = async (refreshToken: string) => {};

export const authOptions = {
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  session: {
    strategy: 'jwt',
    // max age of session-token in cookie
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    signIn: (params) => {
      const { account, user } = params;
      // only allow users with id and id_token to sign in
      return !!(user?.id && account?.id_token);
    },
    redirect: ({ url }) => {
      return url;
    },
    jwt: async (params) => {
      const {
        token: { name, email, picture, sub, ...restToken },
        account,
        user,
      } = params;
      const jwtToken = { ...restToken };
      if (account) {
        // reach here when user first sign in
        jwtToken.id_token = account.id_token;
        jwtToken.refresh_token = account.refresh_token;
        jwtToken.token_type = account.token_type;
        jwtToken.expires_at = account.expires_at;
        return { ...jwtToken, user };
      }
      if (willTokenExpire(jwtToken.expires_at as number)) {
        // reach here when token is about to expire
        const newToken = await refreshCognitoToken(
          jwtToken.refresh_token as string
        );
        // jwtToken.id_token = newToken.id_token;
        // jwtToken.token_type = newToken.token_type;
        // jwtToken.expires_at = newToken.expires_at;
      }

      return jwtToken;
    },
    session: (params) => {
      const { session, token } = params;
      if (session && token) {
        const { user, sub, ...restToken } = token;
        return {
          ...session,
          user,
          token: restToken,
        };
      }
      return params;
    },
  },
} as AuthOptions;
