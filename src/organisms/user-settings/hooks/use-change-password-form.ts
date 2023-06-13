import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import { config } from '@config/config';

import { changePasswordOrFail, ChangePasswordPayload } from '@api/auth';
import { getResponseStatusCode, HttpStatusCode } from '@api/utils';

import { yup } from '@utils/yup';
import { messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';

import { useToast } from '@chakra-ui/react';

const m = messageIdConcat('user_settings.change_password');

type ChangePasswordPayloadWithConfirm = ChangePasswordPayload & {
  newPasswordConfirm: string;
};

export const useChangePasswordForm = () => {
  const intl = useIntl();
  const toast = useToast();

  const [submitting, setSubmitting] = useState(false);

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required(
        messageToString({ id: m('input.old_password.error.required') }, intl),
      ),
    newPassword: yup
      .string()
      .min(
        config.MIN_NAME_LENGTH || 6,
        messageToString({ id: m('input.new_password.error.min') }, intl),
      )
      .max(
        config.MAX_NAME_LENGTH || 64,
        messageToString({ id: m('input.new_password.error.max') }, intl),
      )
      .required(
        messageToString({ id: m('input.new_password.error.required') }, intl),
      ),
    newPasswordConfirm: yup
      .string()
      .oneOf(
        [yup.ref('newPassword'), null],
        messageToString(
          { id: m('input.new_password_confirm.error.match') },
          intl,
        ),
      )
      .required(
        messageToString(
          { id: m('input.new_password_confirm.error.match') },
          intl,
        ),
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<ChangePasswordPayloadWithConfirm>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordPayloadWithConfirm> = useCallback(
    async (data) => {
      setSubmitting(true);
      const { newPasswordConfirm: _newPasswordConfirm, ...newPasswordData } =
        data;
      try {
        await changePasswordOrFail(newPasswordData);
        toast({
          description: messageToString({ id: m('toast.success') }, intl),
          status: 'success',
          duration: 10000,
          isClosable: true,
        });
      } catch (error) {
        if (
          error.response &&
          getResponseStatusCode(error.response) === HttpStatusCode.UNAUTHORIZED
        ) {
          setError('oldPassword', {
            type: 'manual',
            message: messageToString(
              { id: m('input.old_password.error.invalid') },
              intl,
            ),
          });
        } else {
          toast({
            description: messageToString({ id: 'error.api' }, intl),
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
    [intl, toast, setSubmitting],
  );

  return {
    register,
    submit: handleSubmit(onSubmit),
    setValue,
    errors,
    submitting,
  };
};
