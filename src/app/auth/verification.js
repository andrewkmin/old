/**
 * This is a class for checking if user's token is valid
 */
import _axios from "../api/_axios";

class Verification {
  id = null;
  data = null;

  async verify() {
    try {
      const { data } = await _axios.get("/auth/verify");

      if (!data?.error) {
        if (data?.code === "valid".toUpperCase()) {
          this.data = data?.userData;
          this.id = data?.userData._id;
          return true;
        } else {
          console.warn({
            m: "Check verification.js",
            d: `The ${data?.code} code case was not specified`,
            c: data?.code,
          });
          return true;
        }
      } else {
        this.id = "";
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getUserData() {
    return this.data;
  }
}

export default new Verification();
