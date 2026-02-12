import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { BASE_URL } from "../config/config";

const baseURL = BASE_URL as string;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.get(
          `${baseURL}refresh-token`,
          { withCredentials: true }
        );

        const { accessToken } = data;
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          useAuthStore.getState().setAuth(currentUser, accessToken);
        }

        useAuthStore.getState().setAuth(useAuthStore.getState().user!, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
