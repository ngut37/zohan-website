import React, { useMemo, useState } from 'react';

// import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/router';

import { Gender, GENDERS, ROLES } from '@api/auth/types';

import { register as authRegister } from '@api/auth/auth';

import { Message, messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';

import { Button, Input, Link, Text } from '@atoms';

import { InputLabel } from '@molecules/input-label';

import { RadioSelect, RadioItem } from '@molecules/radio-select';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  Stack,
  VStack,
} from '@chakra-ui/react';

import { colors } from '@styles';

import classes from './register-form.module.scss';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthYear: number;
  gender?: Gender;
};

const minBirthYear = 1900;
const maxBirthYear = new Date().getFullYear();

const minNameLength = 2;
const maxNameLength = 64;
const minPasswordLength = 6;
const maxPasswordLength = 256;

const m = messageIdConcat('register');

export const RegisterForm = () => {
  const intl = useIntl();
  const router = useRouter();

  const schema = yup.object().shape({
    firstName: yup
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
      .required(
        messageToString({ id: m('input.first_name.error.required') }, intl),
      ),
    lastName: yup
      .string()
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
      .required(
        messageToString({ id: m('input.last_name.error.required') }, intl),
      ),
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
    gender: yup.string(),
    birthYear: yup
      .number()
      .min(
        minBirthYear,
        messageToString({ id: m('input.birth_year.error.min') }, intl),
      )
      .max(
        maxBirthYear,
        messageToString(
          { id: m('input.birth_year.error.max'), values: { maxBirthYear } },
          intl,
        ),
      )
      .notRequired()
      .nullable()
      .transform((_, value) =>
        value && !Number.isNaN(value) ? Number(value) : null,
      ),
  });

  const [submitting, setSubmitting] = useState(false);
  const [showAuthError, setShowAuthError] = useState<
    { statusCode?: number; errorMessage: Message } | undefined
  >(undefined);

  const genderRadioItems: RadioItem[] = Object.keys(GENDERS).map((gender) => ({
    message: { id: `gender.${gender}` },
    radioProps: { value: gender },
  }));

  const {
    register,
    handleSubmit,
    setValue,
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
        roles: [ROLES.client],
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
          <Stack
            direction={['column', 'row']}
            spacing="5px"
            w="100%"
            align="flex-start"
          >
            <Input
              inputProps={{
                id: 'firstName',
                placeholder: messageToString(
                  { id: m('input.first_name.placeholder') },
                  intl,
                ),
                variant: 'flushed',
                ...register('firstName'),
              }}
              formControlProps={{
                isInvalid: Boolean(errors.firstName),
                w: ['100%', '50%'],
              }}
              error={errors?.firstName}
            />
            <Input
              inputProps={{
                id: 'lastName',
                placeholder: messageToString(
                  { id: m('input.last_name.placeholder') },
                  intl,
                ),
                variant: 'flushed',
                ...register('lastName'),
              }}
              formControlProps={{
                isInvalid: Boolean(errors.lastName),
                w: ['100%', '50%'],
              }}
              error={errors?.lastName}
            />
          </Stack>

          {/* PASSWORD */}
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
          {/* GENDER */}
          <InputLabel message={{ id: m('input.gender.label') }} />
          <RadioSelect
            items={genderRadioItems}
            formControlProps={{ isInvalid: Boolean(errors.gender) }}
            stackDirection={['column', 'row']}
            radioGroupProps={{
              colorScheme: 'teal',
              w: '100%',
              onChange: (radioGroupValue) =>
                setValue('gender', radioGroupValue as Gender),
            }}
            stackProps={{ justifyContent: 'space-between' }}
            error={errors.gender}
          />

          {/* BIRTH YEAR */}
          <InputLabel message={{ id: m('input.birth_year.label') }} />
          <FormControl isInvalid={Boolean(errors.birthYear)}>
            <NumberInput w="100%" variant="flushed">
              <NumberInputField {...register('birthYear')} />
            </NumberInput>
            {errors.birthYear && (
              <FormErrorMessage>{errors.birthYear.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            size="lg"
            type="submit"
            width="100%"
            message={{ id: m('input.button') }}
            isLoading={submitting}
          />
        </VStack>
      </form>
    );
  }, [
    errors.firstName,
    errors.lastName,
    errors.email,
    errors.password,
    errors.passwordConfirm,
    errors.gender,
    errors.birthYear,
    submitting,
  ]);

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
    <Flex width="100%" minH="80vh" p="70px" justify="center" align="center">
      <Flex
        w="100%"
        maxW="1200px"
        direction={['column', 'row-reverse']}
        justify={['center', 'space-evenly']}
        align={['center', 'flex-start']}
      >
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
          <Flex direction="column" justify="center" align="center" width="100%">
            {form}
            {loginError}
          </Flex>
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
