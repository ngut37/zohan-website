import React from 'react';

import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { Session } from 'next-auth';
import Head from 'next/head';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import '@styles/global.scss';
import '@styles/normalize.scss';

import { theme } from '@styles';

function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>ZOHAN</title>
      </Head>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default App;
