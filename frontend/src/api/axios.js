import axios from "../api/axios";

const instance = axios.create({
  baseURL: "http://localhost:5050/api",
});

export default instance;
