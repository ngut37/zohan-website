import React from 'react';

import { UserSettingsMobile } from '@organisms/user-settings/user-settings-mobile';
import { UserSettingsDesktop } from '@organisms/user-settings/user-settings-desktop';

import { Flex, Show } from '@chakra-ui/react';

export const UserSettingsPage = () => {
  return (
    <Flex width="100%">
      <Show below="lg">
        <UserSettingsMobile />
      </Show>
      <Show above="lg">
        <UserSettingsDesktop />
      </Show>
    </Flex>
  );
};
