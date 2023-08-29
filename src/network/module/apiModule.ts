import userStore from "@/store/userStore";
import axios from "axios";

const apiModule = axios.create({
  baseURL: import.meta.env.VITE_APP_BACK_BASE_URL,
});

apiModule.interceptors.request.use((config) => {
  config.headers["accessToken"] = userStore.accessToken;
  return config;
});

export default apiModule;
