import httpClient from "../../configs/axios/http-client";

const BASE_URL = "/brand";

export const BrandAPI = {
  createBrand: (brand) => {
    return httpClient.post(`${BASE_URL}/create`, brand);
  },
  updateBrand: (brand) => {
    return httpClient.put(`${BASE_URL}/update`, brand);
  },
  getBrandInfoById: (id) => {
    return httpClient.get(`${BASE_URL}/getBrandInfoById/${id}}`);
  },
  getBrandInfoBySlug: (slug) => {
    return httpClient.get(`${BASE_URL}/getBrandInfoBySlug/${slug}`);
  },
  getFavoriteBrands: () => {
    return httpClient.get(`${BASE_URL}/getFavoriteBrands`);
  },
};
