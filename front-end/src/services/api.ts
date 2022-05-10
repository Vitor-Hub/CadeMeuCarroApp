import { create } from "apisauce";

const api = create({
  baseURL: "http://172.17.0.1:3000",
  timeout: 3000,
});

export default api;
