export type Entry = {
  id: string;
  date: string;
  text: string;
  picture?: string;
};

export type User = {
  name?: string;
  email: string;
  password: string | undefined;
};
