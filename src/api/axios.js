import axios from "axios";

const api = axios.create({
  baseURL: "https://project-hotel-bookings-9.onrender.com",
 
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
