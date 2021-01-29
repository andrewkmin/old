/**
 * This is a class for checking if user's token is valid
 */
import _axios from "../utils/_axios";

class Verify {
  constructor() {
    this.id = "";
    this.data = {};
  }

  async verify() {
    const { data } = await _axios.get("/auth/verify");
    const { data: userData } = await _axios.get("/api/accounts/fetch");
    this.data = userData;
    if (data.error) {
      this.id = "";
      return false;
    } else {
      this.id = data.id;
      return true;
    }
  }

  getUserData() {
    return this.data;
  }
}

export default new Verify();
