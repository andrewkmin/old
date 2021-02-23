/**
 * This is a class for checking if user's token is valid
 */
import _axios from "../api/_axios";

class Verify {
  constructor() {
    this.id = null;
    this.data = null;
  }

  async verify() {
    try {
      const { data } = await _axios.get("/auth/verify");

      if (!data.hasOwnProperty("error")) {
        this.data = data;
        this.id = data._id;
        return true;
      } else {
        this.id = "";
        return false;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  getUserData() {
    return this.data;
  }
}

export default new Verify();
