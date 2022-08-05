import axios from "axios";
import { serverUrl } from "./config";
import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: serverUrl,
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const token = JSON.parse(localStorage.getItem("profile")).token;
    if (token) {
      const userToken = jwt_decode(token);
      const isExpired = userToken.exp * 1000 > Date.now();
      if (!isExpired) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

console.log(serverUrl);
export default instance;
