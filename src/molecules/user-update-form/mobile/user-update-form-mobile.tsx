import React, { useEffect } from 'react';

import { useIntl } from 'react-intl';

import { messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';

import { Button, Input } from '@atoms';

import { InputLabel } from '@molecules/input-label';

import { useUpdateUserForm } from '@organisms/user-settings/hooks/use-update-user-form';

import { useAuth } from '@modules/root/context/auth';

import { VStack } from '@chakra-ui/react';

const m = messageIdConcat('user_settings.basic_info');

export const UserUpdateMobile = () => {
  const intl = useIntl();
  const { auth } = useAuth();

  const { register, submit, setValue, errors, submitting } =
    useUpdateUserForm();

  useEffect(() => {
    if (auth?.email) {
      setValue('email', auth.email);
    }
    if (auth?.name) {
      setValue('name', auth.name);
    }
    if (auth?.phoneNumber) {
      setValue('phoneNumber', auth.phoneNumber);
    }
  }, [auth]);

  return (
    <form onSubmit={submit}>
      <VStack spacing="30px" maxWidth="600px">
        {/* NAME */}
        <VStack width="100%">
          <InputLabel message={{ id: m('input.name.label') }} />
          <Input
            inputProps={{
              id: 'name',
              placeholder: messageToString(
                { id: m('input.name.placeholder') },
                intl,
              ),
              variant: 'outline',
              ...register('name'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.name),
            }}
            error={errors?.name}
          />
        </VStack>

        <VStack width="100%">
          {/* EMAIL */}
          <InputLabel message={{ id: m('input.email.label') }} />
          <Input
            inputProps={{
              id: 'email',
              autoComplete: 'email',
              placeholder: messageToString(
                { id: m('input.email.placeholder') },
                intl,
              ),
              ...register('email'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.email),
            }}
            error={errors?.email}
          />
        </VStack>

        {/* PHONE NUMBER */}
        <VStack width="100%">
          <InputLabel message={{ id: m('input.phone_number.label') }} />
          <Input
            inputProps={{
              id: 'phoneNumber',
              autoComplete: 'tel',
              ...register('phoneNumber'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.phoneNumber),
            }}
            error={errors?.phoneNumber}
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
