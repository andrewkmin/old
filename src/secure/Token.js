import _axios from "../helpers/_axios";

class Token {
  constructor() {
    this.token = "";
  }

  async validateToken() {
    if (this.token.length === 0) {
      return false;
    } else {
      const token = localStorage.getItem("token");
      const { data } = await _axios.get(`/auth/verify/?token=${token}`);
      if (!data.error) return true;
      else return false;
    }
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  deleteToken() {
    this.token = null;
  }
}

export default new Token();
