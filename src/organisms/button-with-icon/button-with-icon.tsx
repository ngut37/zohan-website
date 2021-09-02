import React from 'react';

import { colors } from '@utils/colors';

import { Button, Icon, IconType } from '@atoms';

import classes from './button-with-icon.module.scss';

type Props = {
  onClick?: () => void;
  buttonMessage: string;
  icon?: IconType;
};

export const ButtonWithIcon = ({ onClick, buttonMessage, icon }: Props) => {
  return (
    <>
      {icon && (
        <Icon
          className={classes.icon}
          icon="badge-check"
          stroke={colors.azure_radiance}
        />
      )}
      <Button message={buttonMessage} onClick={onClick} />
    </>
  );
};
