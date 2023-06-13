import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { User } from '@api/auth/types';

export type AuthContextType = {
  auth: User | undefined;
  authenticate: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setAuthFromAccessToken: () => void;
};

export const useAuth = () => useContext(AuthContext);

// set defaults here
export const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  authenticate: async () => {},
  logout: async () => {},
  loading: true,
  setLoading: () => {},
  setAuthFromAccessToken: () => {},
});
