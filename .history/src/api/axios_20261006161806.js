
import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
  },
});

export default api;

