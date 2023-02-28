import axios from "axios";
// import { store } from "../state";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:3001/"
})

api.interceptors.request.use(config => {
  if (token) {
    config.headers["Authorization"] = "Bearer " + token
  }
  return config
},
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 401) {
    console.log(error);
    return Promise.reject(error)
  }
  return Promise.reject(error)
})