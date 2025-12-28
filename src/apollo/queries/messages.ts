import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      subject
      preview
      sentAt
      unread
      sentFrom
    }
  }
`
