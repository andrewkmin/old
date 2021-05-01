import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

const instance = axios.create({
  baseURL: "https://" + REACT_APP_API_ENDPOINT,
  withCredentials: true,
  validateStatus: false,
});

export default instance;
