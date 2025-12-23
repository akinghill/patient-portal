import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { gql, useApolloClient } from '@apollo/client';

type User = {
  id: string;
  name: string;
  dateOfBirth: string;
  mrn: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  loading: true,
});

const STORAGE_KEY = 'portal-auth';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        dateOfBirth
        mrn
      }
    }
  }
`;

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const apolloClient = useApolloClient();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as { token: string; user: User };
      setUser(parsed.user);
      setToken(parsed.token);
    }
    setLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      });
      const payload = res.data?.login as { token: string; user: User } | undefined;
      if (!payload) throw new Error('Login failed');
      setUser(payload.user);
      setToken(payload.token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },
    [apolloClient],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, token, login, logout, loading }),
    [user, token, login, logout, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
