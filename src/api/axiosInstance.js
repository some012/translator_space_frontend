import axios from "axios";
import {getToken, removeToken, saveToken} from "../utils/auth";

const API_URL = "http://192.168.0.14:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  async (config) => {
    let token = getToken();
    if (!token) return Promise.reject("No token available");

    // Проверяем и обновляем токен
    window.location.href = "/login"
    saveToken();

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/login"; // Переброс на логин
    }
    return Promise.reject(error);
  }
);

export default api;
