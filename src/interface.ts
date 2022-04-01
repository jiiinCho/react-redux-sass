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
  userId: string;
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

/*
Carts
*/
export type ProductT = {
  productId: string;
  quantity: number;
};

// export type RequestCart = {
//   userId: string;
//   date: string;
//   products: ProductT[];
// };

export type CartT = {
  id: string;
  userId: string;
  date: string;
  products: ProductT[];
};

/*
ProductList
*/
export type RatingT = {
  rate: number;
  count: number;
};

export type ProductItemT = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingT;
};
