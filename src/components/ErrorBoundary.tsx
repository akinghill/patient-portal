import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Alert, AlertTitle, Button, Stack } from '@mui/material';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ error: null });
    window.location.assign(window.location.origin + window.location.pathname);
  };

  render() {
    if (this.state.error) {
      return (
        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '60vh', px: 2 }}>
          <Alert severity="error" sx={{ maxWidth: 720, width: '100%' }}>
            <AlertTitle>Something went wrong</AlertTitle>
            <Button variant="contained" onClick={this.handleReset}>
              Reload
            </Button>
          </Alert>
        </Stack>
      );
    }
    return this.props.children;
  }
}
