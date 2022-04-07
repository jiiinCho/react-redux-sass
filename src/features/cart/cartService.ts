import HttpClient from "../network/http";
import { CartT, ProductT } from "../../interface";

export default class CartService {
  constructor(private http: HttpClient) {}

  async getCartByUserId(userId: string): Promise<CartT> {
    const data: CartT[] = await this.http.fetch(`/carts/user/${userId}`, {
      method: "GET",
    });
    return mergeCart(data);
  }

  async add(cart: CartT): Promise<CartT> {
    const data = await this.http.fetch("/carts", {
      method: "POST",
      body: JSON.stringify(cart),
    });
    return data;
  }

  async update(cart: CartT): Promise<CartT> {
    const data = await this.http.fetch(`/carts/${cart.id}`, {
      method: "PUT",
      body: JSON.stringify(cart),
    });
    return data;
  }

  async remove(productId: string): Promise<CartT> {
    const data = await this.http.fetch(`/carts/${productId}`, {
      method: "DELETE",
    });
    return data;
  }
}

type ProductTempT = {
  [key in string]: ProductT;
};
function mergeCart(data: CartT[]): CartT {
  let products: ProductT[] = [];
  let createdAt: number[] = [];

  data.forEach((cart: CartT) => {
    const convertedToInt = new Date(cart.date).getTime();
    createdAt = [...createdAt, convertedToInt];
    products = [...products, ...cart.products];
  });
  // sum all product quantity : [ ]
  const mergedProduct = Object.values(
    products.reduce((prev, { productId, quantity }) => {
      prev[productId] = prev[productId] || { productId, quantity: 0 };
      prev[productId].quantity = prev[productId].quantity + quantity;
      return prev;
    }, {} as ProductTempT)
  );
  const max = Math.max(...createdAt);
  const newestIndex = createdAt.indexOf(max);
  // manipulatedCart ignores cart record history, make new cart of newest date and combined all products
  const manipulatedCart = { ...data[newestIndex], products: mergedProduct }; // createAt : lastest date 
  return manipulatedCart;
}
