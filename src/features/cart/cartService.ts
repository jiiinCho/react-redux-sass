import HttpClient from "../network/http";
import { CartT, ProductT } from "../../interface";

export default class CartService {
  constructor(private http: HttpClient) {}

  async getCartByUserId(userId: string): Promise<CartT> {
    console.log("userId", userId);
    const data: CartT[] = await this.http.fetch(`/carts/user/${userId}`, {
      method: "GET",
    });
    console.log("getCartByUserId recieved", data);
    let products: ProductT[] = [];
    let createdAt: number[] = [];
    data.forEach((cart: CartT) => {
      const convertedToInt = new Date(cart.date).getTime();
      createdAt = [...createdAt, convertedToInt];
      products = [...products, ...cart.products];
    });
    const max = Math.max(...createdAt);
    const newestIndex = createdAt.indexOf(max);
    const manipulatedCart = { ...data[newestIndex], products };
    //this manipulatedCart ignores cart record history, make new cart of newest date and combined all products
    console.log("manipulated Cart", manipulatedCart);
    return manipulatedCart;
  }

  async add(cart: CartT): Promise<CartT> {
    console.log("add -send data: cart:", cart);
    const data = await this.http.fetch("/carts", {
      method: "POST",
      body: JSON.stringify(cart),
    });
    console.log("add -data recieved", data);
    return data;
  }

  async update(cart: CartT): Promise<CartT> {
    console.log("update -send data: cart:", cart);
    console.log("productId", cart.id);
    const data = await this.http.fetch(`/carts/${cart.id}`, {
      method: "PUT",
      body: JSON.stringify(cart),
    });
    console.log("update -data recieved", data);
    return data;
  }

  async remove(productId: string): Promise<CartT> {
    console.log("remove - productId", productId);
    const data = await this.http.fetch(`/carts/${productId}`, {
      method: "DELETE",
    });
    console.log("delete -data recieved", data);
    return data;
  }
}
