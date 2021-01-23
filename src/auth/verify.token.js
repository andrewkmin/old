import _axios from "../helpers/_axios";

class Verify {
  constructor() {
    this.id = "";
  }

  async verify() {
    const { data } = await _axios.get("/auth/verify");
    if (data.error) {
      this.id = "";
      return false;
    } else {
      this.id = data.id;
      return true;
    }
  }
}

export default new Verify();
