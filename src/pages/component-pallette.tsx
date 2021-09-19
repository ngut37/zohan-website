import React, { useCallback } from 'react';

import { Text } from '@atoms';

import { ButtonWithIcon } from '@organisms/button-with-icon';

import { Root } from '@modules/root';

export default function ComponentPallette() {
  const onButtonClick = useCallback(
    () => console.log('Hey, do not touch me!'),
    [],
  );

  return (
    <Root protectedPage>
      <Text fontSize="h1" message={{ text: 'ButtonWithIcon' }} />
      <ButtonWithIcon
        icon="badge-check"
        message={{ text: 'Click me!' }}
        onClick={onButtonClick}
      />
      <Text fontSize="2xl" message={{ text: 'Text' }} />
      <Text fontSize="xs" message={{ text: '2xl' }} />
      <Text fontSize="2xl" message={{ id: 'lorem' }} />
      <Text fontSize="xs" message={{ text: 'xl' }} />
      <Text fontSize="xl" message={{ id: 'lorem' }} />
      <Text fontSize="xs" message={{ text: 'lg' }} />
      <Text fontSize="lg" message={{ id: 'lorem' }} />
      <Text fontSize="xs" message={{ text: 'md' }} />
      <Text fontSize="md" message={{ id: 'lorem' }} />
      <Text fontSize="xs" message={{ text: 'sm' }} />
      <Text fontSize="sm" message={{ id: 'lorem' }} />
      <Text fontSize="xs" message={{ text: 'xs' }} />
      <Text fontSize="xs" message={{ id: 'lorem' }} />
    </Root>
  );
}
