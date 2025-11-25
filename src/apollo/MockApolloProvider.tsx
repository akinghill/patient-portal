import type { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client';
import { mocks } from './mocks';

export function MockApolloProvider({ children }: { children: ReactNode }) {
  return (
    <MockedProvider mocks={mocks} cache={new InMemoryCache()}>
      {children}
    </MockedProvider>
  );
}
