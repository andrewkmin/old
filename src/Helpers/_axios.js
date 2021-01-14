import axios from "axios";

const instance = axios.create({
  baseURL: "http://" + process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

export default instance;
