import React from 'react';

import { Root } from '@modules/root';
import { UserSettingsPage } from '@modules/pages/user-settings';

export default function Settings() {
  return (
    <Root protectedPage>
      <UserSettingsPage />
    </Root>
  );
}
