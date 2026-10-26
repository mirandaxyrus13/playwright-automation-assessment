export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type CreateUserPayload = {
  name: string;
  username: string;
  email: string;
};
