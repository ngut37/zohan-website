import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useRouter } from 'next/router';
// import { session } from 'next-auth/client';

import { logoutOrFail, refreshToken } from '@api/auth/auth';
import { User } from '@api/auth/types';

import {
  getAccessToken,
  parseAccessToken,
  removeAccessToken,
  saveAccessTokenToken,
} from '@utils/storage/auth';

import { Flex, Spinner } from '@chakra-ui/react';

import { colors } from '@styles';

import { AuthContext } from './auth-context';

type Props = PropsWithChildren<{ protectedPage?: boolean }>;

export const AuthProvider = ({ protectedPage = false, children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [auth, setAuthState] = useState<User | undefined>();

  const authenticate = useCallback(async () => {
    // TODO: implement oAuth login

    setLoading(true);
    if (!protectedPage) {
      // A not a protected page -> no need to authenticate
      const accessToken = getAccessToken();
      const data = parseAccessToken(accessToken, {});

      // C access token is valid -> set auth state
      if (data) {
        setAuthState(data);
      }

      setLoading(false);
      return;
    }

    // check if access token is expired
    const accessToken = getAccessToken();
    let data = parseAccessToken(accessToken, {});

    // B access token not present or invalid -> get new access token using refresh token
    if (!data) {
      const { accessToken: refreshedAccessToken } =
        (await refreshToken()) || {};

      if (!refreshedAccessToken) {
        // B_1 refresh token is not valid/expired -> reroute to login page
        removeAccessToken();
        await logout();
        setAuthState(undefined);
        router.push('/login');
        return;
      } else {
        // B_2 persist new access token in localstorage
        saveAccessTokenToken(refreshedAccessToken);
        data = parseAccessToken(refreshedAccessToken, {});
        router.reload();
      }
    }

    // C access token is valid -> set auth state
    if (data) {
      setAuthState(data);
    }

    setLoading(false);
    return;
  }, [setAuthState, router]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      removeAccessToken();
      await logoutOrFail();
      setAuthState(undefined);
      router.push('/login');
    } catch {
      console.error('Logout API failed.');
    }
  }, [setAuthState, router, setLoading]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await authenticate();
      } catch {
        console.error('Authentication failed.');
      }
    })();
  }, []);

  const content = useMemo(
    () =>
      loading ? (
        <Flex width="100%" height="100vh" justify="center" align="center">
          <Spinner
            thickness="4px"
            speed="0.85s"
            emptyColor={colors.white.hex()}
            color={colors.teal_500.hex()}
            size="xl"
          />
        </Flex>
      ) : (
        children
      ),
    [loading, children],
  );

  return (
    <AuthContext.Provider
      value={{ auth, authenticate, logout, loading, setLoading }}
    >
      {content}
    </AuthContext.Provider>
  );
};
