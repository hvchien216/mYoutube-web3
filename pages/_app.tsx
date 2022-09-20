import '../styles/globals.css';
import { LivepeerConfig } from '@livepeer/react';
import type { AppProps } from 'next/app';
import LivePeerClient from '../libs/livepeer';
import { ApolloProvider } from '@apollo/client';
import client from '../libs/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <LivepeerConfig client={LivePeerClient}>
        <Component {...pageProps} />
      </LivepeerConfig>
    </ApolloProvider>
  );
}

export default MyApp;
