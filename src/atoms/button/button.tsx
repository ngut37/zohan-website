import React, { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { Message, messageToString } from '@utils/message';

export type ButtonProps = {
  onClick?: () => void;
  message: Message;
};

export const Button = ({ onClick, message }: ButtonProps) => {
  const intl = useIntl();
  const content = useMemo(
    () => messageToString(message, intl),
    [intl, message],
  );

  return <div onClick={onClick}>{content}</div>;
};
