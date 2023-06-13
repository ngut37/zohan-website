import React from 'react';

import { useIntl } from 'react-intl';

import { messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';

import { Button, Input } from '@atoms';

import { InputLabel } from '@molecules/input-label';

import { useChangePasswordForm } from '@organisms/user-settings/hooks/use-change-password-form';

import { VStack } from '@chakra-ui/react';

const m = messageIdConcat('user_settings.change_password');

export const UserUpdatePasswordMobile = () => {
  const intl = useIntl();
  const { errors, register, submit, submitting } = useChangePasswordForm();

  return (
    <form onSubmit={submit}>
      <VStack spacing="30px" maxWidth="600px">
        {/* OLD PASSWORD */}
        <VStack width="100%">
          <InputLabel message={{ id: m('input.old_password.label') }} />
          <Input
            inputProps={{
              id: 'oldPassword',
              type: 'password',
              placeholder: messageToString(
                { id: m('input.old_password.placeholder') },
                intl,
              ),
              ...register('oldPassword'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.oldPassword),
            }}
            error={errors.oldPassword}
          />
        </VStack>

        {/* NEW PASSWORD */}
        <VStack width="100%">
          <InputLabel message={{ id: m('input.new_password.label') }} />
          <Input
            inputProps={{
              id: 'newPassword',
              type: 'password',
              placeholder: messageToString(
                { id: m('input.new_password.placeholder') },
                intl,
              ),
              ...register('newPassword'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.newPassword),
            }}
            error={errors.newPassword}
          />
          <Input
            inputProps={{
              id: 'newPasswordConfirm',
              type: 'password',
              placeholder: messageToString(
                { id: m('input.new_password_confirm.placeholder') },
                intl,
              ),
              ...register('newPasswordConfirm'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.newPasswordConfirm),
            }}
            error={errors.newPasswordConfirm}
          />
        </VStack>

        <Button
          size="lg"
          type="submit"
          width="100%"
          message={{ id: 'button.save' }}
          isLoading={submitting}
        />
      </VStack>
    </form>
  );
};
