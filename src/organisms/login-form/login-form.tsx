import React, { useCallback, useMemo, useState } from 'react';

// import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineAtSymbol, HiOutlineLockClosed } from 'react-icons/hi';
// import { FcGoogle } from 'react-icons/fc';

import { yupResolver } from '@hookform/resolvers/yup';

import { useIntl } from 'react-intl';

import { getResponseStatusCode, HttpStatusCode } from '@api/utils';
import { loginOrFail } from '@api/auth/auth';

import { messageToString } from '@utils/message';
import { yup } from '@utils/yup';
import { messageIdConcat } from '@utils/message-id-concat';
import { saveAccessTokenToken } from '@utils/storage/auth';

import { Button, Input, Link, Text } from '@atoms';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Divider,
  Flex,
  InputLeftElement,
  useToast,
  VStack,
  Image,
  HStack,
} from '@chakra-ui/react';

import { colors } from '@styles';

import classes from './login-form.module.scss';

type Inputs = {
  email: string;
  password: string;
};

const m = messageIdConcat('login');

export const LoginForm = () => {
  const intl = useIntl();
  const router = useRouter();
  const toast = useToast();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(messageToString({ id: m('input.email.error.format') }, intl))
      .required(messageToString({ id: m('input.email.error.required') }, intl)),
    password: yup
      .string()
      .required(
        messageToString({ id: m('input.password.error.required') }, intl),
      ),
  });

  const [submitting, setSubmitting] = useState(false);
  const [showAuthError, setShowAuthError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      setSubmitting(true);
      try {
        const { accessToken } = await loginOrFail(data);

        saveAccessTokenToken(accessToken);

        router.push('/');
      } catch (error) {
        if (
          error.response &&
          getResponseStatusCode(error.response) === HttpStatusCode.FORBIDDEN
        ) {
          return toast({
            description: messageToString(
              { id: m('toast.must_verify_email') },
              intl,
            ),
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
        }

        if (
          error.response &&
          getResponseStatusCode(error.response) === HttpStatusCode.UNAUTHORIZED
        ) {
          return setShowAuthError(true);
        }

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
    [intl, router, toast, setSubmitting, setShowAuthError],
  );

  const form = useMemo(() => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
        <VStack spacing={5} width="100%">
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
            inputGroupPropsWithChildren={{
              children: (
                <InputLeftElement pointerEvents="none">
                  <HiOutlineAtSymbol color={colors.gray_400.hex()} />
                </InputLeftElement>
              ),
            }}
            error={errors?.email}
          />
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
            inputGroupPropsWithChildren={{
              children: (
                <InputLeftElement pointerEvents="none">
                  <HiOutlineLockClosed color={colors.gray_400.hex()} />
                </InputLeftElement>
              ),
            }}
            formControlProps={{
              isInvalid: Boolean(errors.password),
            }}
            error={errors?.password}
          />
          <Button
            size="lg"
            type="submit"
            width="100%"
            message={{ id: 'button.login' }}
            isLoading={submitting}
          />
        </VStack>
      </form>
    );
  }, [errors.email, errors.password, submitting]);

  // const oAuthSection = useMemo(() => {
  //   return (
  //     <Flex alignItems="center" justifyContent="space-between" width="100%">
  //       <Button
  //         width="49%"
  //         variant="outline"
  //         color="gray.500"
  //         leftIcon={<FcGoogle color="white" />}
  //         message={{ id: 'google' }}
  //         onClick={() =>
  //           signIn('google', { callbackUrl: '/new-oauth-user-landing' })
  //         }
  //       />
  //     </Flex>
  //   );
  // }, []);

  const loginError = useMemo(() => {
    if (showAuthError)
      return (
        <Alert my={5} pr={8} status="error" borderRadius={4} maxWidth="300px">
          <AlertIcon />
          <AlertTitle mr={2}>
            <Text message={{ id: m('error') }} color="gray.600"></Text>
          </AlertTitle>
          <CloseButton
            onClick={() => setShowAuthError(false)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      );
  }, [showAuthError, intl, setShowAuthError]);

  return (
    <Flex
      my="40px"
      px="30px"
      width="100%"
      minH="80vh"
      justify="center"
      align="center"
    >
      <HStack w="100%" maxW="1200px" justifyContent="space-evenly">
        <Flex
          minW="400px"
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
          <Text
            type="heading"
            message={{ id: m('heading') }}
            size="lg"
            mb="40px"
          />
          <VStack
            direction="column"
            justify="center"
            align="center"
            width="100%"
          >
            {form}
            {/* {oAuthSection} */}
            {loginError}
          </VStack>
          <Divider orientation="horizontal" my="10px" />
          <Link href="/register">
            <Button variant="ghost" message={{ id: m('link.register') }} />
          </Link>
        </Flex>
        <Flex
          display={['none', 'none', 'none', 'flex']}
          width="600px"
          marginTop="20px"
        >
          <Image src="/static/img/registration.jpg" opacity="0.5" />
        </Flex>
      </HStack>
    </Flex>
  );
};
