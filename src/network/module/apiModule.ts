import axios from "axios";

const apiModule = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_PATH,
});

apiModule.interceptors.request.use((config) => {
  config.headers["userid"] = "admin";
  return config;
});

export default apiModule;
