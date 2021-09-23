import '@styles/normalize.scss';
import '@styles/global.scss';

import React from 'react';

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
