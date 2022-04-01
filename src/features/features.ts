import HttpClient from "./network/http";
import TokenStorage from "./db/token";
import AuthService from "./auth/authService";
import CartService from "./cart/cartService";
import { API_URL } from "./network/urls";

/*
features.ts -> to manage class instances 
*/

const httpClient = new HttpClient(API_URL);
export const tokenStorage = new TokenStorage();
export const authService = new AuthService(httpClient, tokenStorage);
export const cartService = new CartService(httpClient);
