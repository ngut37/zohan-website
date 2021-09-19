import React, { PropsWithChildren } from 'react';

import { FieldError } from 'react-hook-form';

import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  InputGroup,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroupProps,
} from '@chakra-ui/react';

import { colors } from '@styles';

type Props = {
  inputProps: ChakraInputProps;
  formControlProps?: FormControlProps;
  inputGroupPropsWithChildren?: PropsWithChildren<InputGroupProps>;
  error?: FieldError;
};

export const Input = React.forwardRef(
  ({
    inputProps,
    inputGroupPropsWithChildren,
    formControlProps,
    error,
  }: Props) => {
    const inputGroupChildren = inputGroupPropsWithChildren?.children;
    return (
      <FormControl {...formControlProps}>
        <InputGroup {...inputGroupPropsWithChildren}>
          {inputGroupChildren}
          <ChakraInput
            focusBorderColor={colors.teal_500.hex()}
            bg={colors.white.hex()}
            {...inputProps}
          ></ChakraInput>
        </InputGroup>
        {error && (
          <FormErrorMessage overflowWrap="anywhere">
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  },
);
