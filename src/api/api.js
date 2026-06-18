import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-vote-backend.onrender.com/api", // ✅ backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Attach JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("API REQUEST:", config.method?.toUpperCase(), config.url); // ✅ debug

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔥 Handle responses globally (optional but useful)
API.interceptors.response.use(
  (response) => {
    console.log("API RESPONSE:", response.status, response.config.url); // ✅ debug
    return response;
  },
  (error) => {
    console.error("API ERROR:", error.response?.status, error.config?.url);

    // 🔐 If token expired → logout
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;