import HttpClient from "../network/http";
import { ProductInsertT, ProductItemT } from "../../interface";

export default class ProductListService {
  constructor(private http: HttpClient) {}

  async getProducts(): Promise<ProductItemT[]> {
    return await this.http.fetch(`/products`, {
      method: "GET",
    });
  }

  async add(product: ProductInsertT): Promise<ProductItemT> {
    return await this.http.fetch(`/products`, {
      method: "POST",
      body: JSON.stringify(product),
    });
  }

  async update(product: ProductItemT): Promise<ProductItemT> {
    const { title, price, description, image, category, rating } = product;
    const data = await this.http.fetch(`/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        price,
        description,
        image,
        category,
        rating,
      }),
    });
    return data;
  }

  async remove(productId: string): Promise<ProductItemT> {
    return await this.http.fetch(`/products/${productId}`, {
      method: "DELETE",
    });
  }
}
