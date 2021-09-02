import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
