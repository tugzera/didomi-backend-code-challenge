export type UserCreatedEvent = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};
