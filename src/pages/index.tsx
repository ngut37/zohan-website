import React, { useCallback } from 'react';

import { ButtonWithIcon } from '@organisms/button-with-icon';

export default function Home() {
  const onButtonClick = useCallback(
    () => console.log('Hey, do not touch me!'),
    [],
  );

  return (
    <ButtonWithIcon
      icon="badge-check"
      buttonMessage="Click me!"
      onClick={onButtonClick}
    />
  );
}
