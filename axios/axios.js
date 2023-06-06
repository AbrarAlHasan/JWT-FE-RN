import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.154.143:8000",
});

export default API;
