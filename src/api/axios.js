import axios from "axios";

const api = axios.create({
  baseURL: "https://grambankapi.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// OPTIONAL: auth token later
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default api;
