import * as Yup from 'yup';

import { Message } from './message';
import { phones, PhoneTypes } from './phone-regex';

const validateNumberUniqueness = (phoneNumber: string) => {
  // forbid options like +420 111 111 111 etc.
  return (
    [...new Set(phoneNumber.replace(/((\+|00)?42(0|1))/, '').split(''))]
      .length !== 1
  );
};

Yup.addMethod(Yup.number, 'ignoreEmptyString', function () {
  return this.transform((value) => {
    if (Number.isNaN(value)) return undefined;

    return value;
  });
});

Yup.addMethod(
  Yup.string,
  'phoneNumber',
  function (
    locale: PhoneTypes[] | PhoneTypes = Object.keys(phones) as PhoneTypes[],
    message?,
  ) {
    return this.test('phone-number', message, (value: string | undefined) => {
      const trimmedValue = value?.replace(/\s|-|\(|\)/g, '');
      if (trimmedValue) {
        if (Array.isArray(locale)) {
          return locale.some((key) => {
            const phoneRegex = phones[key as PhoneTypes];
            if (key === 'cs-CZ' || key === 'sk-SK') {
              const isNumbersUnique = validateNumberUniqueness(trimmedValue);
              return phoneRegex.test(trimmedValue) && isNumbersUnique;
            }
            return phoneRegex.test(trimmedValue);
          });
        } else {
          if (locale === 'cs-CZ' || locale === 'sk-SK') {
            const isNumbersUnique = validateNumberUniqueness(trimmedValue);
            return phones[locale].test(trimmedValue) && isNumbersUnique;
          }
          return phones[locale].test(trimmedValue);
        }
      }
      return false;
    });
  },
);

declare module 'yup' {
  interface StringSchema {
    phoneNumber(
      locale?: PhoneTypes[] | PhoneTypes,
      message?: Message | string,
    ): StringSchema;
  }

  interface NumberSchema {
    ignoreEmptyString(): NumberSchema;
  }
}

export const yup = Yup;
export type yup = typeof Yup;

export type ErrorLike = {
  message?: string | Message;
};
