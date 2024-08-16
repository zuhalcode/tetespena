import axios from "axios";

// Axios Instance setup
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
