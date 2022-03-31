const USER = "user";

export default class TokenStorage {
  saveToken(id: string) {
    localStorage.setItem(USER, id);
  }
  getToken() {
    return localStorage.getItem(USER);
  }
  clearToken() {
    localStorage.clear();
  }
}
