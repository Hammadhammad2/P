import axios from "axios";
import { serverUrl } from "./config";
import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: serverUrl,
});

export default instance;
