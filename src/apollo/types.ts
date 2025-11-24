export type CurrentUser = {
  id: string;
  givenName: string;
  familyName: string;
  email: string;
  avatarUrl: string;
  __typename?: 'User';
};

export type GetCurrentUserData = {
  currentUser: CurrentUser;
};