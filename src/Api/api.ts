import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // будет работать с cookie
});

export default api;
