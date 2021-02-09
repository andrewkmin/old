/**
 * This is a class for checking if user's token is valid
 */
import { useQuery } from "react-query";
import _axios from "../api/_axios";

class Verify {
  constructor() {
    this.id = "";
    this.data = {};
  }

  async verify() {
    const { data } = await _axios.get("/auth/verify");
    if (data.error) {
      this.id = "";
      return false;
    } else {
      this.data = data;
      this.id = data._id;
      return true;
    }
  }

  getUserData() {
    return this.data;
  }
}

export const useLogout = () => {
  const Logout = async () => {
    const { data } = await _axios.post("/auth/logout");
    return data;
  };
  return useQuery("logout", Logout);
};

export default new Verify();
