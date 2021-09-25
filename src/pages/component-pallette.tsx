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
    <Root>
      <Text type="h1" message={{ text: 'ButtonWithIcon' }} />
      <ButtonWithIcon
        icon="badge-check"
        message={{ text: 'Click me!' }}
        onClick={onButtonClick}
      />
      <Text type="h1" message={{ text: 'Text' }} />
      <Text type="subsubtext" message={{ text: 'h1' }} />
      <Text type="h1" message={{ id: 'lorem' }} />
      <Text type="subsubtext" message={{ text: 'h2' }} />
      <Text type="h2" message={{ id: 'lorem' }} />
      <Text type="subsubtext" message={{ text: 'h3' }} />
      <Text type="h3" message={{ id: 'lorem' }} />
      <Text type="subsubtext" message={{ text: 'h4' }} />
      <Text type="h4" message={{ id: 'lorem' }} />
      <Text type="subsubtext" message={{ text: 'text' }} />
      <Text type="text" message={{ id: 'lorem' }} />
      <Text type="subsubtext" message={{ text: 'subtext' }} />
      <Text type="subtext" message={{ id: 'lorem' }} />
      <Text type="subsubtext" message={{ text: 'subsubtext' }} />
      <Text type="subsubtext" message={{ id: 'lorem' }} />
    </Root>
  );
}
