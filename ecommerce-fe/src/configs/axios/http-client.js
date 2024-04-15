import config from "./config.js";
import { LOCAL_STORE } from "../../const/system.const.js";

import axios from "axios";
import { localStorageHelper } from "../../helpers";

import { httpStatus } from "../../const/status.const";
import { toast } from "react-toastify";

export const onSignOut = () => {
  localStorageHelper.removeItem(LOCAL_STORE.TOKEN);
};
const configAxios = {
  baseURL: config.HOST_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const httpClient = axios.create(configAxios);

httpClient.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorageHelper.getItem(LOCAL_STORE.TOKEN));
    if (localStorageHelper.isLogin()) {
      config.headers["Authorization"] = `Bearer ${token?.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case httpStatus.StatusUnauthorized:
          onSignOut();
          return Promise.reject(error);
        case httpStatus.StatusForbidden:
          toast.error("Bạn không có quyền truy cập vào server.");
          return Promise.reject(error);
        // return (window.location.href = '/403');
        case httpStatus.StatusNotFound:
          // window.location.href = "/404";
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject({ error, message: "Error!!!" });
  }
);

export default httpClient;
