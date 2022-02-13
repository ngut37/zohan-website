import React, { useMemo, useState } from 'react';

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/client';

import { config } from '@config/config';

import { yupResolver } from '@hookform/resolvers/yup';

import { register as authRegister } from '@api/auth/auth';

import { Message, messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';
import { yup } from '@utils/yup';

import { Button, Input, Link, Text } from '@atoms';

import { InputLabel } from '@molecules/input-label';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Divider,
  Flex,
  VStack,
} from '@chakra-ui/react';

import { colors } from '@styles';

import classes from './register-form.module.scss';

type Inputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
};

const minNameLength = 2;
const maxNameLength = 64;
const minPasswordLength = 6;
const maxPasswordLength = 256;

const m = messageIdConcat('register');

export const RegisterForm = () => {
  const intl = useIntl();
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup
      .string()
      .strict()
      .min(
        minNameLength,
        messageToString(
          {
            id: m('input.name.error.min'),
            values: { length: minNameLength },
          },
          intl,
        ),
      )
      .max(
        maxNameLength,
        messageToString(
          {
            id: m('input.name.error.max'),
            values: { length: maxNameLength },
          },
          intl,
        ),
      )
      .required(messageToString({ id: m('input.name.error.required') }, intl)),
    email: yup
      .string()
      .email(messageToString({ id: m('input.email.error.format') }, intl))
      .required(messageToString({ id: m('input.email.error.required') }, intl)),
    password: yup
      .string()
      .min(
        minPasswordLength,
        messageToString({ id: m('input.password.error.min') }, intl),
      )
      .max(
        maxPasswordLength,
        messageToString({ id: m('input.password.error.max') }, intl),
      )
      .required(
        messageToString({ id: m('input.password.error.required') }, intl),
      ),
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        messageToString({ id: m('input.password_confirm.error.match') }, intl),
      )
      .required(
        messageToString({ id: m('input.password_confirm.error.match') }, intl),
      ),
    phoneNumber: yup.string().phoneNumber(
      ['cs-CZ', 'sk-SK'],
      messageToString(
        {
          id: m('input.phone_number.error.format'),
        },
        intl,
      ),
    ),
  });

  const [submitting, setSubmitting] = useState(false);
  const [showAuthError, setShowAuthError] = useState<
    { statusCode?: number; errorMessage: Message } | undefined
  >(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSubmitting(true);
    const { passwordConfirm: _pc, ...restData } = data;
    try {
      const { success } = await authRegister({
        ...restData,
      });
      if (success) {
        router.push('/component-pallette');
      }
    } catch (e) {
      if (e?.response?.status === 409) {
        setError(
          'email',
          {
            message: messageToString(
              { id: m('input.email.error.conflict') },
              intl,
            ),
          },
          { shouldFocus: true },
        );
      } else {
        setShowAuthError({
          statusCode: e?.response?.status,
          errorMessage: { id: m('error.general') },
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const form = useMemo(() => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
        <VStack spacing={5}>
          {/* NAME */}
          <InputLabel message={{ id: m('input.name.label') }} />
          <Input
            inputProps={{
              id: 'name',
              placeholder: messageToString(
                { id: m('input.name.placeholder') },
                intl,
              ),
              variant: 'flushed',
              ...register('name'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.name),
            }}
            error={errors?.name}
          />

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

          {/* PASSWORD */}
          <InputLabel message={{ id: m('input.password.label') }} />
          <Input
            inputProps={{
              id: 'password',
              type: 'password',
              placeholder: messageToString(
                { id: m('input.password.placeholder') },
                intl,
              ),
              ...register('password'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.password),
            }}
            error={errors?.password}
          />
          <Input
            inputProps={{
              id: 'passwordConfirm',
              type: 'password',
              placeholder: messageToString(
                { id: m('input.password_confirm.placeholder') },
                intl,
              ),
              ...register('passwordConfirm'),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.passwordConfirm),
            }}
            error={errors?.passwordConfirm}
          />

          {/* PHONE NUMBER */}
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

          <Button
            size="lg"
            type="submit"
            width="100%"
            message={{ id: m('button.submit') }}
            isLoading={submitting}
          />
        </VStack>
      </form>
    );
  }, [
    errors.name,
    errors.email,
    errors.password,
    errors.passwordConfirm,
    errors.phoneNumber,
    submitting,
  ]);

  const oAuthSection = useMemo(() => {
    return (
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Button
          width="49%"
          variant="outline"
          color="gray.500"
          leftIcon={<FcGoogle color="white" />}
          message={{ id: 'google' }}
          onClick={() =>
            signIn('google', {
              callbackUrl: `${config.APP_URL}/new-oauth-user-landing`,
            })
          }
        />
        <Button
          width="49%"
          colorScheme="facebook"
          leftIcon={<FaFacebook color="white" />}
          message={{ id: 'facebook' }}
          onClick={() =>
            signIn('facebook', {
              callbackUrl: `${config.APP_URL}/new-oauth-user-landing`,
            })
          }
        />
      </Flex>
    );
  }, []);

  const loginError = useMemo(() => {
    if (showAuthError?.errorMessage)
      return (
        <Alert my={5} pr={8} status="error" borderRadius={4} maxWidth="100%">
          <AlertIcon />
          <AlertTitle mr={2}>
            <Text message={showAuthError.errorMessage} color="gray.600"></Text>
          </AlertTitle>
          <CloseButton
            onClick={() => setShowAuthError(undefined)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      );
  }, [showAuthError?.errorMessage, intl, setShowAuthError]);

  return (
    <Flex
      width="100%"
      minH="80vh"
      p="70px"
      justify="space-evenly"
      align="center"
    >
      <Flex
        width="100%"
        maxW="1200px"
        direction={['column', 'row-reverse']}
        justify={['center', 'space-evenly']}
        align={['center', 'flex-start']}
      >
        <Flex
          display={['none', 'none', 'none', 'flex']}
          width="600px"
          marginTop="20px"
        >
          <img src="/static/img/registration.jpg" />
        </Flex>
        <Flex
          py="40px"
          px={['20px', '40px']}
          direction="column"
          justify="center"
          align="center"
          bgColor={colors.white.hex()}
          boxShadow="md"
          border="1px"
          borderColor="gray.100"
          borderRadius="md"
        >
          <VStack mb="40px" spacing="5px">
            <Text type="heading" message={{ id: m('heading') }} size="lg" />
            <Text
              type="text"
              message={{ id: m('sub_heading') }}
              fontSize="sm"
            />
          </VStack>
          <VStack
            direction="column"
            justify="center"
            align="center"
            width="100%"
          >
            {form}
            {oAuthSection}
            {loginError}
          </VStack>
          <Divider orientation="horizontal" my="10px" />
          <Link href="/login">
            <Button
              variant="link"
              type="submit"
              message={{ id: m('link.login') }}
            />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
