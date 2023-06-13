import React from 'react';

import { Root } from '@modules/root';
import { LandingPage } from '@modules/pages/landing';

export default function Home() {
  return (
    <Root protectedPage passthrough>
      <LandingPage />
    </Root>
  );
}
