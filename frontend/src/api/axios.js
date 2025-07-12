import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5050/api",
  baseURL: import.meta.env.VITE_API_URL + "/api",

});

export default instance;
