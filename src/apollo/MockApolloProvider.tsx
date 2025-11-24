import { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { mocks } from './mocks';

export function MockApolloProvider({ children }: { children: ReactNode }) {
  return <MockedProvider mocks={mocks} addTypename>{children}</MockedProvider>;
}


