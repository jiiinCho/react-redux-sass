export type RoleT = "user" | "admin";
type NameT = {
  firstname: string;
  lastname: string;
};

type AddressT = {
  city: string;
  street: string;
  number: string;
  zipcode: string;
};

export type LoginUser = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  token: string;
};

export type User = {
  email: string;
  username: string;
  password: string;
  role?: RoleT;
  firstname: string;
  lastname: string;
  city: string;
  street: string;
  stnumber: string;
  zipcode: string;
  phone: string;
};

export type ResponseUser = RequestUser & {
  id: string;
};

export type RequestUser = {
  email: string;
  username: string;
  password: string;
  role: RoleT;
  name: NameT;
  address: AddressT;
  phone: string;
};
