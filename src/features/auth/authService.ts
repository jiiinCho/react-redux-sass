import HttpClient from "../network/http";
import TokenStorage from "../db/token";
import {
  RequestUser,
  User,
  LoginUser,
  LoginResponse,
  ResponseUser,
} from "../../interface";

export default class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

  async signup(user: User): Promise<ResponseUser> {
    const signupUser = makeRequestBody(user, user.username === "admin");
    const data = await this.http.fetch("/users", {
      method: "POST",
      body: JSON.stringify(signupUser),
    });
    data && this.tokenStorage.saveToken(data.id);
    return data;
  }

  async signin(user: LoginUser): Promise<LoginResponse> {
    const { username, password } = user;
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    data && this.tokenStorage.saveToken(data.userId);
    return data;
  }

  async getAllUser(): Promise<ResponseUser[]> {
    const data = await this.http.fetch(`/users`, {
      method: "GET",
    });
    return data;
  }

  async getUser(id: string): Promise<ResponseUser> {
    // const userId = this.tokenStorage.getToken();
    // console.log("getUser called - userId from tokenstorage", id);
    const data = await this.http.fetch(`/users/${id}`, {
      method: "GET",
    });
    return data;
  }
  async update(user: User, id: string): Promise<ResponseUser> {
    const signupUser = makeRequestBody(user, user.username === "admin");
    const data = await this.http.fetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(signupUser),
    });
    return data;
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}

function makeRequestBody(user: User, isAdmin: boolean): RequestUser {
  const {
    email,
    username,
    password,
    firstname,
    lastname,
    city,
    street,
    stnumber,
    zipcode,
    phone,
  } = user;
  const name = { firstname, lastname };
  const address = { city, street, number: stnumber, zipcode };
  return {
    email,
    username,
    password,
    role: isAdmin ? "admin" : "user",
    name,
    address,
    phone,
  };
}

/*
import axios from "axios";
import { User } from "../../interface";

const API_URL = "/api/users";

//Register user
const register = async (userData: User) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Login user
const login = async (userData: User) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;


  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch("/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }


*/
