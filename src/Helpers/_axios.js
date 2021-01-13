import axios from "axios";

const URL = () => {
  if (process.env.NODE_ENV === "production") return "https://" + process.env.HOST_NAME;
  else return "http://" + process.env.REACT_APP_HOST_NAME;
};

const instance = axios.create({
  baseURL: URL(),
  withCredentials: true,
});

export default instance;
