import { ApolloProvider } from '@apollo/client';
import '@fontsource/inter';
import '../styles/globals.css';
import '../styles/styles.css';
import type { AppProps } from 'next/app';
import client from '../apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
