import _axios from "../helpers/_axios";

class Verify {
  constructor() {
    this.id = "";
  }

  async verify() {
    const { data } = await _axios.get("/auth/verify");
    if (!data.error) {
      return true;
    } else {
      return false;
    }
  }
}

export default new Verify();
