import React from 'react';

import { useIntl } from 'react-intl';

import { messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';

import {
  ActiveBookingsMobile,
  HistoricBookingsMobile,
} from '@molecules/user-update-form/mobile';
import {
  UserUpdateDesktop,
  UserUpdatePasswordDesktop,
} from '@molecules/user-update-form/desktop';

import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

const m = messageIdConcat('user_settings');

export const UserSettingsDesktop = () => {
  const intl = useIntl();

  return (
    <Flex width="100%" justifyContent="center">
      <Tabs
        orientation="vertical"
        variant="line"
        width="100%"
        marginTop="20px"
        align="start"
        size="md"
        colorScheme="teal"
        maxWidth="800px"
      >
        <TabList marginRight="50px" height="min-content">
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
            <UserUpdateDesktop />
          </TabPanel>
          <TabPanel>
            <UserUpdatePasswordDesktop />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
