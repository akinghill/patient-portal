import { gql } from '@apollo/client'

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      id
      date
      department
      clinician
      status
    }
  }
`
