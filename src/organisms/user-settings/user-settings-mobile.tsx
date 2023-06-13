import React from 'react';

import { useIntl } from 'react-intl';

import { messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';

import {
  ActiveBookingsMobile,
  HistoricBookingsMobile,
  UserUpdateMobile,
  UserUpdatePasswordMobile,
} from '@molecules/user-update-form/mobile';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const m = messageIdConcat('user_settings');

export const UserSettingsMobile = () => {
  const intl = useIntl();

  return (
    <Tabs
      orientation="horizontal"
      variant="enclosed"
      width="100%"
      marginTop="20px"
      align="center"
      size="md"
      colorScheme="teal"
    >
      <TabList>
        <Tab>{messageToString({ id: m('tab.bookings') }, intl)}</Tab>
        <Tab>{messageToString({ id: m('tab.basic_info') }, intl)}</Tab>
        <Tab>{messageToString({ id: m('tab.password') }, intl)}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Tabs
            isLazy
            orientation="horizontal"
            variant="soft-rounded"
            width="100%"
            align="center"
            size="md"
            colorScheme="teal"
            isFitted
          >
            <TabList marginBottom="10px" maxWidth="600px">
              <Tab>{messageToString({ id: m('tab.active') }, intl)}</Tab>
              <Tab>{messageToString({ id: m('tab.historic') }, intl)}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding="0">
                <ActiveBookingsMobile />
              </TabPanel>
              <TabPanel padding="0">
                <HistoricBookingsMobile />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <UserUpdateMobile />
        </TabPanel>
        <TabPanel>
          <UserUpdatePasswordMobile />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
