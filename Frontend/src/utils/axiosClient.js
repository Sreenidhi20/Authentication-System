import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",   // <-- lowercase b
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;