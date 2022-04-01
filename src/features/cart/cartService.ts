import HttpClient from "../network/http";
import { CartT } from "../../interface";

export default class CartService {
  constructor(private http: HttpClient) {}

  async getCartByUserId(userId: string): Promise<CartT> {
    const data = await this.http.fetch(`/carts/user/${userId}`, {
      method: "GET",
    });
    console.log("getCartByUserId recieved", data);
    return data;
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
