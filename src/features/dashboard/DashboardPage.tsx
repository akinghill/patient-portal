import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid2 as Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { useSuspenseQuery } from '@apollo/client'
import { format } from 'date-fns'
import { GET_CURRENT_USER, GET_APPOINTMENTS, GET_MESSAGES } from '../../apollo/queries'
import type { GetAppointments, GetCurrentUserData } from '../../apollo/types'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import ApartmentIcon from '@mui/icons-material/Apartment'
import ScienceIcon from '@mui/icons-material/Science'

export default function DashboardPage(): JSX.Element {
  const { data: userRes } = useSuspenseQuery<GetCurrentUserData>(GET_CURRENT_USER)
  const { data: appointmentsRes } = useSuspenseQuery<GetAppointments>(GET_APPOINTMENTS)
  const { data: messagesRes } = useSuspenseQuery<any>(GET_MESSAGES)

  const user = userRes.currentUser
  const appointments = appointmentsRes.appointments
  const messages = messagesRes.messages

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

      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <Card variant='outlined' sx={{ maxWidth: 345 }}>
          <Stack direction='row' alignItems='center' spacing={2} p={1} px={2}>
            <Typography variant='h6' sx={{ mb: 1 }}>
              Messages
            </Typography>
            <IconButton>
              <ArrowOutwardIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={2} p={1} px={2}>
            {messages.map((m: any) => (
              <Box key={m.id}>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Avatar>
                    {m.sentFrom === 'office' && <ApartmentIcon />}
                    {m.sentFrom === 'lab' && <ScienceIcon />}
                  </Avatar>
                  <Stack>
                    <Typography sx={{ fontWeight: 600 }}>{m.subject}</Typography>
                    <Typography variant='body2' color='text.secondary' noWrap>
                      {m.preview}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            ))}
            {messages.length === 0 ? <Typography variant='body2'>No messages.</Typography> : null}
          </Stack>
        </Card>
      </Grid>
    </Stack>
  )
}
