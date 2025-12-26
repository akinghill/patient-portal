// User
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

// Appointments
export type Appointment = {
  id: string;
  date: string;
  department: string;
  clinician: string;
  status: string;
}

export type GetAppointments = {
  appointments: Appointment[]
}