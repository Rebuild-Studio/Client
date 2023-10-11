import axios from "axios";
import { user_store } from "../stores/User_Store";

const imgProcessApi = axios.create({
  baseURL: process.env.REACT_APP_IMAGE_BACK_BASE_URL,
});

imgProcessApi.interceptors.request.use((config) => {
  config.headers["userId"] = user_store.id;
  return config;
});

export default imgProcessApi;
