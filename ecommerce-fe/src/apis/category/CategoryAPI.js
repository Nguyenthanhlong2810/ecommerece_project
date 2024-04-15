import httpClient from "../../configs/axios/http-client";

const BASE_URL = "/categories";

export const CategoryAPI = {
  getAllCategory: () => {
    return httpClient.get(`${BASE_URL}/getAll`);
  },
  getDetailCategoryById: (id) => {
    return httpClient.get(`${BASE_URL}/getDetail/${id}`);
  },
  getSpecificationSubject: () => {
    return httpClient.get(`${BASE_URL}/classification/getSpecificationSubject`);
  },
  getCategoryByIds: (ids) => {
    return httpClient.post(`${BASE_URL}/getListCategoryByIds`, ids);
  },
  getAll: () => {
    return httpClient.get(`${BASE_URL}/getAllCategory`);
  },
};
