import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Thay đổi import này nếu jwtDecode không phải là default export
import apiService from "./api";
import { logout, updateToken } from "../slices/authSlice";
import { store } from "../store";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    try {
      const date = new Date();
      const { access_token, refresh_token } = store.getState().auth.token;
      const decoded = jwtDecode(access_token);

      if (decoded.exp < date.getTime() / 1000) {
        try {
      
          const res = await apiService.refreshToken(refresh_token);

          config.headers.Authorization = `Bearer ${res.access_token}`;
        const _token = {
            access_token: res.access_token,
            refresh_token: res.refresh_token
        }
          store.dispatch(updateToken(_token));
        } catch (error) {
          if (
            error.response.data.message === "Refresh token is invalid" &&
            error.response.status === 401
          ) {
            store.dispatch(logout());
          } else {
            console.error("Unknown error during token refresh:", error);
          }
          throw error;
        }
      } else {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    } catch (error) {
      console.error("Error in request interceptor:", error);
      throw error; // Ném lỗi để request bị từ chối
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosJWT;
