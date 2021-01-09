import axios from "axios";

const token = localStorage.getItem("token");

const URL = () => {
  if (process.env.NODE_ENV === "production") return process.env.HOST_NAME;
  else return process.env.REACT_APP_HOST_NAME;
};

const instance = axios.create({
  baseURL: URL(),
  headers: {
    authorization: `Bearer ${token ? token : ""}`,
  },
});

export default instance;
