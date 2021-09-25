import React from 'react';

import { colors } from '@utils/colors';

import { Button, ButtonProps, Icon, IconType } from '@atoms';

import classes from './button-with-icon.module.scss';

type Props = ButtonProps & {
  icon?: IconType;
};

export const ButtonWithIcon = ({ onClick, message, icon }: Props) => {
  return (
    <>
      {icon && (
        <Icon
          className={classes.icon}
          icon="badge-check"
          stroke={colors.azure_radiance}
        />
      )}
      <Button message={message} onClick={onClick} />
    </>
  );
};
