import React, { useCallback } from 'react';

import { ButtonWithIcon } from '@organisms/button-with-icon';

import { Root } from '@modules/root';

export default function Home() {
  const onButtonClick = useCallback(
    () => console.log('Hey, do not touch me!'),
    [],
  );

  return (
    <Root>
      <ButtonWithIcon
        icon="badge-check"
        message={{ text: 'Click me!' }}
        onClick={onButtonClick}
      />
    </Root>
  );
}
