import type { MockedResponse } from '@apollo/client/testing'
import { daysFromNowIso } from './utils'
import { GET_CURRENT_USER, GET_APPOINTMENTS } from './queries'

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
  {
    request: { query: GET_APPOINTMENTS },
    result: {
      data: {
        appointments: [
          {
            id: 'a1',
            date: daysFromNowIso(1),
            department: 'Cardiology',
            clinician: 'Dr. Kim',
            status: 'SCHEDULED',
          },
          {
            id: 'a2',
            date: daysFromNowIso(-5),
            department: 'Primary Care',
            clinician: 'Dr. Patel',
            status: 'COMPLETED',
          },
          {
            id: 'a3',
            date: daysFromNowIso(14),
            department: 'Dermatology',
            clinician: 'Dr. Lee',
            status: 'SCHEDULED',
          },
        ],
      },
    },
  },
]
