import axios from "axios";

const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.response.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page on unauthorized access
    }
    return Promise.reject(error);
  }
);
