import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import z from 'zod';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parse = schema.safeParse({ email, password });
    if (!parse.success) {
      setError(parse.error.errors[0]?.message ?? 'Invalid form data');
      return;
    }
    setLoading(true);

    try {
      // login
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100svh', px: 2 }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 420, p: 4 }}>
        <Stack component='form' onSubmit={onSubmit} spacing={2}>
          <Typography>
            Sign in to <i>your</i> Patient Portal
          </Typography>
          {error ? <Alert severity='error'>{error}</Alert> : null}
          <TextField
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
            required
          />
          <TextField
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
            required
          />
          <Button variant='contained' type='submit'>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <Typography component='p' variant='body2' sx={{ color: 'text.secondary' }}>
            Use "test@email.com" and '123' to sign in (mocked).
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
