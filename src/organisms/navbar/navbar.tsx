import React, { useContext, useMemo } from 'react';

import { HiOutlineUserCircle } from 'react-icons/hi';
import { GiHamburgerMenu } from 'react-icons/gi';
// import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { messageIdConcat } from '@utils/message-id-concat';

import { Text, Link, Button } from '@atoms';

import { AuthContext } from '@modules/root/context/auth';

import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Show,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { colors } from '@styles';

const m = messageIdConcat('navbar');

export const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  // const [session] = useSession(); // TODO: reimplement this when implement next-auth oAuth
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const isLookUpServices = useMemo(() => {
    return router.route.includes('/venues');
  }, [router]);

  const isLandingPage = useMemo(() => {
    return router.route === '/';
  }, [router]);

  const desktopAuthLinks = useMemo(() => {
    if (!auth)
      return (
        <HStack spacing="20px">
          <Link href="/venues">
            <Text
              color="whitesmoke"
              fontSize="lg"
              message={{ id: m('link.look_up_services') }}
              borderBottom={`1px solid ${
                isLookUpServices ? 'whitesmoke' : 'transparent'
              }`}
            />
          </Link>
          <Divider orientation="vertical" />
          <Link href="/login">
            <Text
              color="whitesmoke"
              fontSize="lg"
              message={{ id: m('login') }}
            />
          </Link>
          <Link href="/register">
            <Text
              color="whitesmoke"
              fontSize="lg"
              message={{ id: m('register') }}
            />
          </Link>
        </HStack>
      );
    else {
      const { name } = auth || {};
      // TODO: use code below after implementing profile
      // const userAvatarUrl = user?.image || auth.avatarUrl;
      // const userAvatar = userAvatarUrl ? (
      //   <Flex borderRadius="50%" overflow="hidden" width="30px" height="30px">
      //     <img src={userAvatarUrl} />
      //   </Flex>
      // ) : (
      //   <HiOutlineUserCircle width="20px" color={colors.whitesmoke.hex()} />
      // );

      const userAvatar = (
        <HiOutlineUserCircle width="20px" color={colors.whitesmoke.hex()} />
      );
      return (
        <>
          <HStack
            spacing="50px"
            height="40px"
            paddingX="40px"
            justifyContent="center"
          >
            <Link href="/venues">
              <Text
                width="99px"
                color="whitesmoke"
                fontSize="lg"
                message={{ id: m('link.look_up_services') }}
                transition="border-bottom 0.2s"
                borderBottom={`1px solid ${
                  isLookUpServices ? 'whitesmoke' : 'transparent'
                }`}
                _hover={{ fontWeight: 'semibold' }}
              />
            </Link>
          </HStack>
          <HStack spacing="20px">
            {userAvatar}
            <Text color="white" message={{ text: name }} whiteSpace="nowrap" />
            <Button
              variant="solid"
              colorScheme="whiteAlpha"
              onClick={logout}
              message={{ id: 'navbar.logout' }}
            />
          </HStack>
        </>
      );
    }
  }, [auth, isLookUpServices, logout]);

  const mobileAuthLinks = useMemo(() => {
    const userAvatar = (
      <HiOutlineUserCircle
        width="20px"
        fontSize="30px"
        color={colors.teal_500.hex()}
      />
    );

    const drawer = (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody
            display="flex"
            marginTop="60px"
            marginBottom="20px"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <VStack width="100%" alignItems="flex-end" spacing="30px">
              <Link href="/">
                <Text
                  color="teal"
                  fontSize="xx-large"
                  message={{ id: m('link.home') }}
                  borderBottom={`1px solid ${
                    isLandingPage ? 'teal' : 'transparent'
                  }`}
                />
              </Link>
              <Link href="/venues">
                <Text
                  color="teal"
                  fontSize="xx-large"
                  message={{ id: m('link.look_up_services') }}
                  borderBottom={`1px solid ${
                    isLookUpServices ? 'teal' : 'transparent'
                  }`}
                />
              </Link>
            </VStack>

            {auth ? (
              <VStack width="100%" alignItems="flex-end" spacing="30px">
                <HStack>
                  {userAvatar}
                  <Text
                    fontSize="xl"
                    color="teal"
                    message={{ text: auth.name }}
                    fontWeight="semibold"
                  />
                </HStack>
                <Button
                  size="lg"
                  variant="solid"
                  onClick={logout}
                  message={{ id: 'navbar.logout' }}
                />
              </VStack>
            ) : (
              <VStack width="100%" alignItems="flex-end" spacing="30px">
                <Link href="/login">
                  <Text
                    color="teal"
                    fontSize="x-large"
                    message={{ id: m('login') }}
                  />
                </Link>
                <Link href="/register">
                  <Text
                    color="teal"
                    fontSize="x-large"
                    message={{ id: m('register') }}
                  />
                </Link>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    return (
      <>
        {drawer}
        <Button onClick={() => onOpen()}>
          <GiHamburgerMenu fontSize="25px" />
        </Button>
      </>
    );
  }, [auth, isOpen, onOpen, onClose, isLookUpServices, isLandingPage]);

  const responsiveAuthLinks = useMemo(() => {
    return (
      <>
        <Show above="lg">{desktopAuthLinks}</Show>
        <Show below="lg">{mobileAuthLinks}</Show>
      </>
    );
  }, [auth, desktopAuthLinks, mobileAuthLinks]);

  return (
    <Flex
      bgColor={colors.teal_500.hex()}
      width="100%"
      height={70}
      justify="space-between"
      px={[4, 7]}
    >
      <Flex width={200} justify="space-between" align="center">
        <Link href="/">
          <Text
            type="heading"
            message={{ id: 'brand_name' }}
            size="lg"
            color="whitesmoke"
            marginLeft={['10px', '0']}
          />
        </Link>
      </Flex>
      <HStack
        minWidth={[180, 200]}
        spacing="20px"
        align="center"
        justifyContent="flex-end"
      >
        {responsiveAuthLinks}
      </HStack>
    </Flex>
  );
};
