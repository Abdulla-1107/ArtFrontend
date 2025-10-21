import axios from "axios";

const api = axios.create({
  baseURL: "https://doc.saparboy.uz",
});

export default api;
