/* eslint-disable filenames/match-regex */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { config } from '@config/config';

import { emailExists, register } from '@api/auth';
import { OAuthType } from '@api/auth/types';

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: true,
  // },
  providers: [
    // OAuth authentication providers
    Providers.Google({
      clientId: config.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: config.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
    // Providers.Facebook({
    //   clientId: config.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
    //   clientSecret: config.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    // }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/new-oauth-user-landing',
  },
  callbacks: {
    async signIn(user, account, _profile) {
      // check if user exists in database
      let userExits: boolean | undefined;
      if (user.email) {
        userExits = await emailExists(user.email);
      }
      if (userExits) {
        return true;
      } else {
        const { id, email, name } = user;
        const provider = account.provider as OAuthType;
        // create a new user in database
        if (email && name)
          await register({
            name,
            email,
            oAuth: {
              userId: id as string,
              type: provider,
            },
          });

        return true;
      }
    },
    async redirect(url: string, baseUrl: string): Promise<string> {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session(session, _token) {
      return session;
    },
  },
});
