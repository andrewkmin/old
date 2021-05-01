import axios from "../api/axios";

export const verify = async () => {
  const { data } = await axios.get("/auth/verify");
  return data;
};
