import { Stack } from '@mui/material';
import { useSuspenseQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../apollo/queries/user';
import { GetCurrentUserData } from '../../apollo/types';

export default function DashboardPage(): JSX.Element {
  const { data } = useSuspenseQuery<GetCurrentUserData>(GET_CURRENT_USER);
  
  const user = data.currentUser;
  return (
    <Stack spacing={3}>
      <h1>Welcome, {user.givenName}</h1>
    </Stack>
  );
}
