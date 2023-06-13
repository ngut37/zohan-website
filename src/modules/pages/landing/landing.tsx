import React, { useMemo } from 'react';

import { Text, Button, Link } from '@atoms';

import { useAuth } from '@modules/root/context/auth';

import { Flex, VStack, Divider, Image, HStack, Show } from '@chakra-ui/react';

export const LandingPage = () => {
  const { auth } = useAuth();

  const ctaButton = useMemo(() => {
    if (auth) {
      return (
        <VStack position="relative">
          <Link href="/venues">
            <Button
              height="70px"
              width="300px"
              size="lg"
              message={{ id: 'button.look_up_services' }}
            />
          </Link>
          <Show above="md">
            <Flex
              height="150px"
              transform="rotate(230deg)"
              position="absolute"
              top="-50px"
              right="-200px"
            >
              <Image
                width="100%"
                src="/static/img/arrow-hand-dawn.svg"
                objectFit="fill"
                objectPosition="top"
                transform="scaleX(-1)"
              />
            </Flex>
          </Show>
        </VStack>
      );
    } else {
      return (
        <VStack
          alignItems={['center', 'center', 'flex-start']}
          position="relative"
        >
          <Link href="/register">
            <Button
              height="70px"
              width="200px"
              size="lg"
              message={{ id: 'button.register' }}
            />
          </Link>
          <Link href="/login">
            <Text
              type="text"
              fontSize="md"
              fontWeight="bold"
              color="teal.600"
              message={{ id: 'landing.cta.button.login' }}
            />
          </Link>
          <Show above="md">
            <Flex
              height="150px"
              transform="rotate(230deg)"
              position="absolute"
              top="-50px"
              right="-200px"
            >
              <Image
                width="100%"
                src="/static/img/arrow-hand-dawn.svg"
                objectFit="fill"
                objectPosition="top"
                transform="scaleX(-1)"
              />
            </Flex>
          </Show>
        </VStack>
      );
    }
  }, [auth]);

  return (
    <Flex
      height="93vh"
      width="100%"
      justifyContent="center"
      alignItems="flex-start"
      position="relative"
    >
      <VStack
        maxWidth="1500px"
        minHeight="93vh"
        justifyContent="flex-end"
        width="100%"
      >
        <HStack
          marginTop="50px"
          position="absolute"
          alignItems="flex-start"
          textAlign="left"
          spacing="20px"
          zIndex="1"
          top="0"
          marginX="40px"
        >
          <Show above="lg">
            <Text
              type="heading"
              size="3xl"
              color="teal.500"
              opacity="0.9"
              message={{ id: 'brand_name' }}
              marginTop="15px"
              marginRight="20px"
            />
            <Divider
              orientation="vertical"
              height="300px"
              width="13px"
              color="black"
            />
          </Show>
          <VStack
            maxWidth="560px"
            marginBottom="40px"
            height="vh"
            spacing="35px"
            direction="column"
            justifyContent="center"
            alignItems={['center', 'center', 'flex-start']}
            textAlign={['center', 'center', 'left']}
          >
            <Text
              type="text"
              fontSize="5xl"
              fontWeight="bold"
              color="gray.700"
              message={{ id: 'landing.cta.title' }}
            />
            <Text
              type="text"
              fontSize="xl"
              color="gray.600"
              message={{ id: 'landing.cta.subtitle' }}
            />
            {ctaButton}
          </VStack>
        </HStack>
        <Flex width="100%" overflow="hidden" height="70vh">
          <Image
            width="100%"
            src="/static/img/hair-salon.jpg"
            objectFit="cover"
            objectPosition="top"
            opacity="0.2"
          />
        </Flex>
      </VStack>
    </Flex>
  );
};
