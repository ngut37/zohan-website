import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import { config } from '@config/config';

import { updateUserOrFail, UpdateUserPayload } from '@api/auth';

import { yup } from '@utils/yup';
import { messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';

import { useAuth } from '@modules/root/context/auth';

import { useToast } from '@chakra-ui/react';

const m = messageIdConcat('user_settings.basic_info');

export const useUpdateUserForm = () => {
  const intl = useIntl();
  const toast = useToast();
  const { setAuthFromAccessToken } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .strict()
      .min(
        config.MIN_NAME_LENGTH || 2,
        messageToString(
          {
            id: m('input.name.error.min'),
            values: { length: config.MIN_NAME_LENGTH || 2 },
          },
          intl,
        ),
      )
      .max(
        config.MAX_NAME_LENGTH || 64,
        messageToString(
          {
            id: m('input.name.error.max'),
            values: { length: config.MAX_NAME_LENGTH || 64 },
          },
          intl,
        ),
      )
      .required(messageToString({ id: m('input.name.error.required') }, intl)),
    email: yup
      .string()
      .email(messageToString({ id: m('input.email.error.format') }, intl))
      .required(messageToString({ id: m('input.email.error.required') }, intl)),
    phoneNumber: yup
      .string()
      .phoneNumber(
        ['cs-CZ', 'sk-SK'],
        messageToString(
          {
            id: m('input.phone_number.error.format'),
          },
          intl,
        ),
      )
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserPayload>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UpdateUserPayload> = useCallback(
    async (data) => {
      setSubmitting(true);
      try {
        await updateUserOrFail(data);
        toast({
          description: messageToString({ id: m('toast.success') }, intl),
          status: 'success',
          duration: 10000,
          isClosable: true,
        });
        setAuthFromAccessToken();
      } catch (error) {
        toast({
          description: messageToString({ id: 'error.api' }, intl),
          status: 'error',
          duration: 10000,
          isClosable: true,
        });
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
