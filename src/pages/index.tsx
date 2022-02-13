import React from 'react';

import Image from 'next/image';

import { Text, Button, Link } from '@atoms';

import { Root } from '@modules/root';

import { Flex, VStack, Divider } from '@chakra-ui/react';

export default function Home() {
  return (
    <Root>
      <Flex height="70vh" width="100%" justifyContent="center">
        <Flex maxWidth="1500px" justifyContent="space-between">
          <Flex width="800px" position="relative">
            <Image
              src="/static/img/hair-salon.jpg"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </Flex>

          <VStack
            maxWidth="300px"
            spacing="20px"
            direction="column"
            justify="center"
            align={['center', 'flex-end']}
            m="50px"
          >
            <Text
              type="heading"
              fontWeight={900}
              size="2xl"
              color="teal.600"
              message={{ id: 'brand_name' }}
            />
            <Divider orientation="horizontal" my="10px" />
            <Text
              type="text"
              fontSize="sm"
              textAlign={['center', 'right']}
              message={{ id: 'landing.cta.text' }}
              marginBottom="40px !important"
            />
            <Link href="/register">
              <Button size="lg" message={{ id: 'landing.cta.button' }} />
            </Link>
          </VStack>
        </Flex>
      </Flex>
    </Root>
  );
}
