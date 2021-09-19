import { createContext } from 'react';

import { User } from '@api/auth/types';

export type AuthContextType = {
  auth: User | undefined;
  authenticate: () => Promise<void>;
};

// set defaults here
export const AuthContext = createContext<AuthContextType>({
  auth: {
    userId: '',
    roles: [],
  },
  authenticate: async () => {},
});
