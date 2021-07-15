import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-post-api-rest.herokuapp.com",
});

export default api;
