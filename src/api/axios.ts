import $axios from "axios";

export const axios = $axios.create({
  baseURL: "https://summer-bush-7025.fly.dev/api/",
  // baseURL: "http://localhost:3001/api/",
});

export const initializeAxios = (token: string) => {
  axios.interceptors.request.use((config) => {
    if (!config || !config.headers) return config;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
