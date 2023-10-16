import axios from "axios";
import { user_store } from "../stores/User_Store";

const MXApiModule = axios.create({
  baseURL: process.env.REACT_APP_BACK_BASE_URL,
});

MXApiModule.interceptors.request.use((config) => {
  config.headers["userId"] = user_store.id;
  return config;
});

export default MXApiModule;
