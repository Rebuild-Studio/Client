import axios from "axios";

const usersAPI = axios.create({
  baseURL: process.env.REACT_APP_BACK_BASE_URL + "/users",
  withCredentials: process.env.REACT_APP_DEV === "true" ? false : true,
});

usersAPI.interceptors.request.use(
  async function async(config) {
    await axios
      .get(process.env.REACT_APP_BACK_BASE_URL + "/users/checkToken")
      .then(async (res) => {
        if (res.data.refreshToken && !res.data.accessToken) {
          await axios.get(
            process.env.REACT_APP_BACK_BASE_URL + "/users/refresh",
            {
              withCredentials: true,
            }
          );
        }
      });

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

usersAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
