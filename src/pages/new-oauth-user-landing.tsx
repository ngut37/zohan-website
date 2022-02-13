import React from 'react';

import { PhoneNumberForm } from '@organisms/phone-number-form';

import { Root } from '@modules/root';

export default function NewOAuthUserLanding() {
  return (
    <Root protectedPage>
      <PhoneNumberForm />
    </Root>
  );
}
