import HttpClient from "./network/http";
import TokenStorage from "./db/token";
import AuthService from "./auth/authService";
import ProductListService from "./products/productsService";
import CartService from "./cart/cartService";
import { API_URL } from "./network/urls";

/*
features.ts -> to manage class instances 
*/

const httpClient = new HttpClient(API_URL);
export const tokenStorage = new TokenStorage();
export const authService = new AuthService(httpClient, tokenStorage);
export const cartService = new CartService(httpClient);
export const productListService = new ProductListService(httpClient);

/*
ADMIN_ID can be security issue? 
*/
export const ADMIN_ID = 100;
