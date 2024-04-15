import httpClient from "../../configs/axios/http-client";

// const BASE_URL = "/auth";
const BASE_URL = "/users";

export const UserAPI = {
  checkEmail: (data) => {
    return httpClient.post(`${BASE_URL}/checkEmail`, data);
  },
  register: (data) => {
    return httpClient.post(`${BASE_URL}/register`, data);
  },
  login: (data) => {
    return httpClient.post(`${BASE_URL}/login`, data);
  },
  loginByGoogle: (token) => {
    return httpClient.get(`${BASE_URL}/loginWithGoogle?token=${token}`);
  },
  getUserInfo: () => {
    return httpClient.get(`${BASE_URL}/getUserInfo`);
  },
};
