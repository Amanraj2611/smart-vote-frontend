import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-vote-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Do NOT send token for login/register
    if (
      token &&
      config.url !== "/auth/login" &&
      config.url !== "/auth/register"
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.url
    );

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
API.interceptors.response.use(
  (response) => {
    console.log(
      "API RESPONSE:",
      response.status,
      response.config.url
    );
    return response;
  },
  (error) => {
    console.error(
      "API ERROR:",
      error.response?.status,
      error.config?.url
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;