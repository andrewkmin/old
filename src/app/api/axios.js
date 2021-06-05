import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

// Axios HTTP client for our API
export default axios.create({
  baseURL: "https://" + REACT_APP_API_ENDPOINT,
  withCredentials: true,
  validateStatus: false,
});
