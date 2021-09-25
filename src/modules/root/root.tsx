import React, { PropsWithChildren } from 'react';

import { Text, Link } from '@atoms';

import { MessagesProvider } from '@modules/message-provider/message-provider';

import classes from './root.module.scss';

export type RootProps = { isHidden?: boolean };

type Props = PropsWithChildren<RootProps>;

export const Root = ({ isHidden, children }: Props) => {
  if (isHidden) return null;
  return (
    <MessagesProvider>
      <div className={classes.rootWrapper}>
        <div className={classes.root}>
          <Link href="/login">
            <Text message={{ id: 'login' }} />
          </Link>
          <Link href="/register">
            <Text message={{ id: 'register' }} />
          </Link>
        </div>
        {children}
      </div>
    </MessagesProvider>
  );
};
