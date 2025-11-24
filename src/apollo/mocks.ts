import type { MockedResponse } from '@apollo/client/testing';
import { GET_CURRENT_USER } from './queries/user';

export const mocks: MockedResponse[] = [
  {
    request: { query: GET_CURRENT_USER },
    result: {
      data: {
        currentUser: {
          __typename: 'User',
          id: 'u_123',
          givenName: 'Patient12',
          familyName: 'Doe',
          email: 'patient12@example.com',
          avatarUrl: 'https://i.pravatar.cc/100?img=12',
        },
      },
    },
  },
];
