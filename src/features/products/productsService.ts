import HttpClient from "../network/http";
import { ProductItemT } from "../../interface";

export default class ProductListService {
  constructor(private http: HttpClient) {}

  async getProducts(): Promise<ProductItemT[]> {
    return await this.http.fetch(`/products`, {
      method: "GET",
    });
  }

  async getProduct(productId: string): Promise<ProductItemT[]> {
    return await this.http.fetch(`/products/${productId}`, {
      method: "GET",
    });
  }
}
