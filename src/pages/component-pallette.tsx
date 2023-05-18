import React from 'react';

import { Text } from '@atoms';

import { Root } from '@modules/root';

export default function ComponentPallette() {
  return (
    <Root protectedPage>
      <Text fontSize="h1" message={{ text: 'ButtonWithIcon' }} />
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
