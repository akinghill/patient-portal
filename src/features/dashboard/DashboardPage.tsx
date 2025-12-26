import { Box, Card, CardContent, Chip, Grid2 as Grid, Stack, Typography } from '@mui/material'
import { useSuspenseQuery } from '@apollo/client'
import { format } from 'date-fns'
import { GET_CURRENT_USER, GET_APPOINTMENTS } from '../../apollo/queries'
import type { GetAppointments, GetCurrentUserData } from '../../apollo/types'

export default function DashboardPage(): JSX.Element {
  const { data: userRes } = useSuspenseQuery<GetCurrentUserData>(GET_CURRENT_USER)
  const { data: appointmentsRes } = useSuspenseQuery<GetAppointments>(GET_APPOINTMENTS)

  const user = userRes.currentUser
  const appointments = appointmentsRes.appointments

  return (
    <Stack spacing={3}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography component='h2' variant='h5' sx={{ fontWeight: 700 }}>
          Welcome, {user.givenName}
        </Typography>
        <Chip color='primary' label='Summary' />
      </Box>

      {/* Dashboard Cards: Appointments, Labs, Messages */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 1 }}>
              Upcoming Appointments
            </Typography>
            <Stack spacing={1}>
              {appointments.map((a: any) => (
                <Box key={a.id}>
                  <Typography sx={{ fontWeight: 600 }}>{format(new Date(a.date), 'EEE, MMM d, p')}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {a.department} — {a.clinician}
                  </Typography>
                </Box>
              ))}
              {appointments.length === 0 ? <Typography variant='body2'>No upcoming appointments.</Typography> : null}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Stack>
  )
}
