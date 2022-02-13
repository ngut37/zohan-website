import React from 'react';

import { NextComponentType, NextPageContext } from 'next';
import { Session } from 'next-auth';
import { ClientSafeProvider, providers, session } from 'next-auth/client';

import { RegisterForm } from '@organisms/register-form';

import { Root } from '@modules/root';

type InitialProps = {
  providers: Record<string, ClientSafeProvider> | null;
  session: Session | null;
};

type Props = InitialProps;

const Register: NextComponentType<NextPageContext, InitialProps, Props> = ({
  providers,
  session,
}) => {
  providers;
  session;

  return (
    <Root>
      <RegisterForm />
    </Root>
  );
};

Register.getInitialProps = async (context) => {
  const sessionObject = await session(context);
  return {
    providers: await providers(),
    session: sessionObject,
  };
};

export default Register;
