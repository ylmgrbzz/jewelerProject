import axios from "axios";

const api = axios.create({
  baseURL: "https://kuyumcu.mmustafa.dev",
});

// interceptors
api.interceptors.request.use(async (config) => {
  console.log(config.url);
  if (config.url === "/login") {
    return config;
  }
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// refresh token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = localStorage.getItem("token");

      const response = await api.post("/refresh", { token });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
